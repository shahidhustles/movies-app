import { icons } from "@/constants/icons";
import { Image, TextInput, View } from "react-native";

type SearchBarType = {
  onPress?: () => void;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

const SearchBar = ({
  onPress,
  placeholder,
  onChangeText,
  value,
}: SearchBarType) => {
  return (
    <View className="flex-row items-center bg-dark-200 px-4 py-4 rounded-full">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#ab8bff"}
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};
export default SearchBar;
