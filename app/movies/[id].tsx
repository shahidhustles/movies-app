import { getMovieDetail } from "@/actions/get-movie-detail";
import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

type MovieInfoProps = {
  label: string;
  value: string | number | null;
};

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 font-bold text-sm mt-2 ">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const Id = () => {
  const { id } = useLocalSearchParams();
  const { data: movie } = useFetch({
    fetchFunction: () => getMovieDetail(id as string),
    autoFetch: true,
  });
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="items-start justify-start flex-col mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row gap-x-1 mt-2 items-center">
            <Text className="text-light-200 text-sm">
              {" "}
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm"> {movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview || "N/A"} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget !== undefined
                  ? `$${movie.budget / 1_000_000}M`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000}M`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                .map((comp) => comp.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center z-50"
      >
        <View className="flex-1 flex-row items-center justify-center">
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor={"#fff"}
          />
          <Text className="text-white font-semibold text-base text-center">
            Go Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Id;
