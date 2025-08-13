import { getMovie } from "@/actions/get-movie";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
const Search = () => {
  const {
    data: movies,
    loading: isLoading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch({
    fetchFunction: () => getMovie({ query: searchQuery }),
    autoFetch: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadMovies, reset]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !isLoading && !error ? (
            <View>
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? "No movies Found"
                    : "Search for a movie"}
                </Text>
              </View>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <View>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10 mb-5" />
            </View>
            <View>
              <SearchBar
                placeholder="Search for movies..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            {isLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error : {error.message}
              </Text>
            )}

            {!isLoading &&
              !error &&
              movies?.length > 0 &&
              searchQuery.trim() && (
                <Text className="text-xl text-white mt-3 font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </View>
        }
      />
    </View>
  );
};
export default Search;
