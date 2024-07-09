import { useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Image, RefreshControl, Text, View, TouchableOpacity } from "react-native";
import useAppwrite from "../../lib/useAppwrite";
import { getAllGames } from "@/lib/appwrite";
import GameCard from "../../components/Gamecard";
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'black',
    flex: 1,
  },
  listHeader: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  titleText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  logoImage: {
    width: 36,
    height: 40,
  },
  searchInput: {
    marginTop: 6,
    marginBottom: 16,
  },
});

const Home = () => {
  const router = useRouter();
  const { data: posts, refetch } = useAppwrite(getAllGames);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
            <GameCard data={item} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <View>
                <Text style={styles.headerText}>Welcome Back</Text>
                <Text style={styles.titleText}>Enjoy</Text>
              </View>
              <View style={{ marginTop: 6 }}>
                <Image
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
