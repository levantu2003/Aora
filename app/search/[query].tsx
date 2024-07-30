import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query as string);
  const {
    data: posts,
    refetch,
    isLoading,
  } = useAppwrite(() => searchPosts(searchQuery));

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-cfmedium text-sm text-gray-100">
              Tìm kiếm kết quả
            </Text>
            <Text className="text-2xl font-cfmedium text-white">
              {searchQuery}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput
                title="Tìm kiếm"
                value={searchQuery}
                placeholder="Tìm kiếm thể loại video"
                handleChangeText={handleSearch}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Không có video tìm thấy"
            subtitle="Không có video nào được tìm thấy với từ khóa"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
