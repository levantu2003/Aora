import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyle, titleStyle }) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-cfsemibold ${titleStyle}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-cfregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
