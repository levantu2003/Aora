import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { userGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = userGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <View>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.cards}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Khám phá những khả năng vô tận với {""}
                <Text className="text-secondary-200">Aora</Text>
              </Text>
            </View>
            <Text className="text-sm font-cfregular text-gray-100 mt-7 text-center">
              Nơi sáng tạo gặp đổi mới: bắt tay vào hành trình khám phá không
              giới hạn cùng Aura
            </Text>
            <CustomButton
              title="Tiếp tục với Email"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-full mt-7"
              textStyles=""
              isLoading={false}
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </View>
  );
}
