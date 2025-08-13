import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

type TabIconType = {
  iconSrc: any;
  text: string;
  focused: boolean;
};

const TabIcon = ({ iconSrc, text, focused }: TabIconType) => {
  return (
    <>
      {focused ? (
        <ImageBackground
          source={images.highlight}
          className="flex flex-1 flex-row justify-center w-full
                    rounded-full items-center mt-4 min-h-16 min-w-[112px]
                     overflow-hidden"
        >
          <Image source={iconSrc} tintColor={"#151312"} className="size-5" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {text}
          </Text>
        </ImageBackground>
      ) : (
        <View className="flex-1 justify-center items-center mt-4">
          <Image source={iconSrc} className="size-5" tintColor={"#A8B5DB"} />
        </View>
      )}
    </>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1, 
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconSrc={icons.home} text={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconSrc={icons.search} text={"Search"} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconSrc={icons.save} text={"Saved"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconSrc={icons.person}
              text={"Profile"}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default _Layout;
