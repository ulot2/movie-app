import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from "@/contexts/SavedMoviesContext";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <View className="flex-1 bg-dark-100 rounded-xl py-4 px-3 items-center">
    <Text className="text-accent text-xl font-bold">{value}</Text>
    <Text className="text-light-300 text-xs mt-1">{label}</Text>
  </View>
);

interface MenuItemProps {
  icon: any;
  label: string;
  isLast?: boolean;
}

const MenuItem = ({ icon, label, isLast }: MenuItemProps) => (
  <View
    className={`flex-row items-center py-4 ${!isLast ? "border-b border-dark-100" : ""}`}
  >
    <View className="bg-dark-100 rounded-full p-2.5 mr-4">
      <Image source={icon} className="size-5" tintColor="#AB8BFF" />
    </View>
    <Text className="text-white text-base flex-1">{label}</Text>
    <Image source={icons.arrow} className="size-4" tintColor="#9CA4AB" />
  </View>
);

const Profile = () => {
  const { savedMovies } = useSavedMovies();

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="w-full flex-row justify-center mt-20">
          <Image source={icons.logo} className="w-12 h-10" />
        </View>

        {/* Avatar Section */}
        <View className="items-center mt-10">
          <View className="bg-dark-100 rounded-full p-6 mb-4">
            <Image
              source={icons.person}
              className="size-14"
              tintColor="#AB8BFF"
            />
          </View>
          <Text className="text-white text-2xl font-bold">Movie Fan</Text>
          <Text className="text-light-300 text-sm mt-1">Member since 2026</Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-3 mt-8">
          <StatCard label="Watched" value={0} />
          <StatCard label="Saved" value={savedMovies.length} />
          <StatCard label="Reviews" value={0} />
        </View>

        {/* Menu */}
        <View className="mt-8 bg-dark-200 rounded-2xl px-5 py-1">
          <MenuItem icon={icons.person} label="Edit Profile" />
          <MenuItem icon={icons.save} label="My Watchlist" />
          <MenuItem icon={icons.star} label="My Reviews" />
          <MenuItem icon={icons.search} label="Help & Support" />
          <MenuItem icon={icons.home} label="About" isLast />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
