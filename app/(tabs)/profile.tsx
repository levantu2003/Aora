import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import {
  getUserPosts,
  signOut,
  checkAuthStatus,
  getCurrentUser,
} from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { router } from "expo-router";
import { userGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const { user, setUser, setisLoggedIn } = userGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (!isAuthenticated) {
        setUser(null);
        setisLoggedIn(false);
        router.replace("/sign-in");
      } else {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          (async (userId) => {
            if (userId) {
              const userPosts = await getUserPosts(userId);
            }
          })(currentUser.$id);
        } else {
          setUser(null);
          setisLoggedIn(false);
          router.replace("/sign-in");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  console.log(user);
  const logout = async () => {
    setIsLoading(true);
    const success = await signOut();
    setIsLoading(false);
    if (success) {
      setUser(null);
      setisLoggedIn(false);
      router.replace("/sign-in");
    } else {
      Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại sau.");
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    if (user?.$id) {
      await (async (userId) => {
        if (userId) {
          const userPosts = await getUserPosts(userId);
        }
      })(user.$id);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white">Đang tải...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <Text className="text-white">Không tìm thấy thông tin người dùng</Text>
        <TouchableOpacity
          onPress={() => router.replace("/sign-in")}
          className="mt-4"
        >
          <Text className="text-secondary">Đăng nhập lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
              disabled={isLoading}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyle="text-lg"
              subtitle=""
            />
            <View className="mt-5 flex-row ">
              <InfoBox
                title={posts.length.toString()}
                subtitle="Bài đăng"
                containerStyle="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox
                title="6.9k"
                subtitle="Người theo dõi"
                titleStyle="text-xl"
                containerStyle=""
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Không có video tìm thấy"
            subtitle="Bạn chưa đăng video nào"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
