import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "saved_movies";

interface SavedMoviesContextType {
  savedMovies: Movie[];
  saveMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const SavedMoviesContext = createContext<SavedMoviesContextType>({
  savedMovies: [],
  saveMovie: () => {},
  removeMovie: () => {},
  isSaved: () => false,
});

export const useSavedMovies = () => useContext(SavedMoviesContext);

export const SavedMoviesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  // Load saved movies from storage on mount
  useEffect(() => {
    const loadSavedMovies = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSavedMovies(JSON.parse(stored));
        }
      } catch (error) {
        console.log("Error loading saved movies:", error);
      }
    };
    loadSavedMovies();
  }, []);

  // Persist to storage whenever savedMovies changes
  const persist = useCallback(async (movies: Movie[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (error) {
      console.log("Error saving movies:", error);
    }
  }, []);

  const saveMovie = useCallback(
    (movie: Movie) => {
      setSavedMovies((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev;
        const updated = [movie, ...prev];
        persist(updated);
        return updated;
      });
    },
    [persist],
  );

  const removeMovie = useCallback(
    (id: number) => {
      setSavedMovies((prev) => {
        const updated = prev.filter((m) => m.id !== id);
        persist(updated);
        return updated;
      });
    },
    [persist],
  );

  const isSaved = useCallback(
    (id: number) => savedMovies.some((m) => m.id === id),
    [savedMovies],
  );

  return (
    <SavedMoviesContext.Provider
      value={{ savedMovies, saveMovie, removeMovie, isSaved }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};
