import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import { fetchMoviesDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value: string | number | null | undefined;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 px-5">
    <Text className="text-light-100 text-sm font-normal">{label}</Text>
    <Text className="text-light-200 font-bold mt-2 text-sm">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { saveMovie, removeMovie, isSaved } = useSavedMovies();

  const { data: movie, loading } = useFetch(() =>
    fetchMoviesDetails(id as string),
  );

  const saved = movie ? isSaved(movie.id) : false;

  const handleToggleSave = () => {
    if (!movie) return;

    if (saved) {
      removeMovie(movie.id);
    } else {
      // Convert MovieDetails to Movie shape for saving
      saveMovie({
        id: movie.id,
        title: movie.title,
        adult: movie.adult,
        backdrop_path: movie.backdrop_path || "",
        genre_ids: movie.genres?.map((g) => g.id) || [],
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview || "",
        popularity: movie.popularity,
        poster_path: movie.poster_path || "",
        release_date: movie.release_date,
        video: movie.video,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      });
    }
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          {/* Bookmark button */}
          <TouchableOpacity
            onPress={handleToggleSave}
            className="absolute top-12 right-5 bg-dark-100/80 rounded-full p-2.5"
          >
            <Image
              source={icons.save}
              className="size-6"
              tintColor={saved ? "#AB8BFF" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
        </View>
        <MovieInfo label="Overview" value={movie?.overview} />
        <MovieInfo
          label="Genres"
          value={movie?.genres?.map((genre) => genre.name).join(", ") || "N/A"}
        />
        <View className="flex-row justify-between w-1/2">
          <MovieInfo
            label="Budget"
            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
          />
          <MovieInfo
            label="Revenue"
            value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}`}
          />
        </View>
        <MovieInfo
          label="Production Companies"
          value={
            movie?.production_companies
              ?.map((company) => company.name)
              .join(", ") || "N/A"
          }
        />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 bg-accent py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
