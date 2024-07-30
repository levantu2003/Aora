import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface SearchInputProps {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value: initialValue,
  placeholder,
  handleChangeText,
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const pathname = usePathname();

  const handleSearch = () => {
    if (!inputValue.trim()) {
      return Alert.alert("Thiếu truy vấn", "Vui lòng nhập để tìm kiếm");
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query: inputValue });
    } else {
      router.push(`/search/${inputValue}`);
    }
    handleChangeText(inputValue);
  };

  const onChangeText = (text: string) => {
    setInputValue(text);
  };

  return (
    <View className="border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-cfregular"
        value={inputValue}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={onChangeText}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
