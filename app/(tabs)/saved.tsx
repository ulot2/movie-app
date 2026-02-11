import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const Saved = () => {
  const { savedMovies } = useSavedMovies();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          gap: 20,
          justifyContent: "flex-start",
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <Text className="text-white text-2xl font-bold mt-8 mb-5">
              Saved Movies
            </Text>
          </>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Image
              source={icons.save}
              className="size-16 mb-5"
              tintColor="#AB8BFF"
            />
            <Text className="text-white text-lg font-semibold mb-2">
              No saved movies yet
            </Text>
            <Text className="text-light-300 text-sm text-center px-10">
              Tap the bookmark icon on any movie to save it here for later
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Saved;
