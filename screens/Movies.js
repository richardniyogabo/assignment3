import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Movies = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        getMovies(1);
    }, []);

    const getMovies =  async(next) => {
        try {
            const response = await axios.get('https://jsonmock.hackerrank.com/api/movies?page='+ next);
            setMovies(response.data.data);
            const jsonMovies = JSON.stringify(response.data.data);
            await AsyncStorage.setItem('movies',jsonMovies);
            setNextPage(nextPage + 1);
        } catch (error) {
            console.log(error);
            // const moviesString = await AsyncStorage.getItem('movies');
            // const parsedMovies = JSON.parse(moviesString);
            // setMovies(parsedMovies);

        }
    }

    const getMoreMovies =  async() => {
        try {
            setLoadMore(true)
            const response = await axios.get('https://jsonmock.hackerrank.com/api/movies?page='+ nextPage);
            setMovies([...movies, ...response.data.data]);
            const jsonMovies = JSON.stringify(movies);
            await AsyncStorage.setItem('movies',jsonMovies);
            setNextPage(nextPage + 1);
            setLoadMore(false)
        } catch (error) {
            console.log(error);
            // const moviesString = await AsyncStorage.getItem('movies');
            // const parsedMovies = JSON.parse(moviesString);
            // setMovies(parsedMovies);
            setLoadMore(false)
        }
    }

  return (
    <SafeAreaView style={{
        backgroundColor: '#fff',
        flex: 1,
    }}>
        <View style={{
            marginTop: 20,
            width: '100%',
            height: '90%',
        }}>
            <FlatList
                data={movies}
                refreshing={refreshing}
                onEndReachedThreshold={0.2}
                onEndReached={getMoreMovies}
                keyExtractor={(item, indx) => indx}
                onRefresh={() => getMovies(2)}
                ItemSeparatorComponent={<View style={{
                    padding: 10,
                }} />}
                renderItem={({item}) => <View style={{
                    width: '90%',
                    borderRadius: 10,
                    borderColor: '#c4c4c4',
                    borderWidth: 1,
                    padding: 10,
                    alignSelf: 'center'
                }}>
                    <Text style={{
                    }}>{item.Title}</Text>
                    <Text style={{
                    }}>{item.Year}</Text>
                </View>}
            />
        </View>
        {
            loadMore && <ActivityIndicator size={54} color={'blue'} />
        }
    </SafeAreaView>
  )
}

export default Movies

const styles = StyleSheet.create({})