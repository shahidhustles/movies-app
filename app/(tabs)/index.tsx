import { getPopularMovies } from "@/actions/get-popular-movies";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading: isLoading,
    error,
  } = useFetch({
    fetchFunction: () => getPopularMovies(),
    autoFetch: true,
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="z-0 absolute w-full" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <View className="mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>

        {isLoading && (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10 self-center"
          />
        )}

        {error && (
          <Text className="text-red-500 text-center mt-5">{error.message}</Text>
        )}

        {!isLoading && !error && movies && movies.length > 0 && (
          <>
            <Text className="font-bold mt-5 mb-3 text-lg text-white">
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item: movie }) => <MovieCard {...movie} />}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              nestedScrollEnabled={true}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                paddingRight: 5,
                gap: 20,
                marginBottom: 10,
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}
