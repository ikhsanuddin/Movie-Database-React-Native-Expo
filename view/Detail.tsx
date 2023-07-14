import { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MovieDetail, Search } from '../types/movieTypes';
import BackgroundImage from '../components/BackgroundImage';
import { requestDB } from '../utils/request';
import {
  Text,
  Card,
  ActivityIndicator,
} from 'react-native-paper';


function CardData({ title, content }: { title: string; content: string }) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title style={{ minHeight: 40 }} title="" subtitle={title} />
      <Card.Content>
        <Text>{content}</Text>
      </Card.Content>
    </Card>
  );
}

type Props = NativeStackScreenProps<Search, 'Detail'>;

export default function DetailView({ route }: Props) {
  const { Poster, Title, imdbID, Year } = route.params;

  const [movieData, setMovieData] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const result = async () =>
      await requestDB({
        params: {
          i: imdbID,
        },
      }).then((data) => {
        setMovieData(data);
      });

    result();
  }, [imdbID]);

  return (
    <View style={{ flex: 1 }}>
      <BackgroundImage uri={Poster} opacity={0.7} blur={10} />
      <ScrollView>
        <Card style={{ margin: 10 }}>
          <Card.Title title={Title} />
          <Card.Content style={{ flexDirection: 'row' }}>
            <Image source={{ uri: Poster }} style={styles.image} />
            <View style={{ marginHorizontal: 10, flex: 1 }}>
              <Text>{Year}</Text>
              {movieData ? (
                <Text style={{ flex: 1, flexWrap: 'wrap', marginTop: 5 }}>
                  {movieData.Plot}
                </Text>
              ) : (
                <ActivityIndicator animating={true} size="small" />
              )}
            </View>
          </Card.Content>
        </Card>
        {!movieData && <ActivityIndicator animating={true} size="large" />}
        {movieData && (
          <>
            <CardData title="Genre" content={movieData.Genre} />
            <CardData title="Actors" content={movieData.Actors} />
            <CardData title="Director" content={movieData.Director} />
            <CardData title="Writer" content={movieData.Writer} />
            <CardData title="Language" content={movieData.Language} />
            <CardData title="IMDB Rating" content={movieData.imdbRating} />
            <CardData title="Duration" content={movieData.Runtime} />
            <CardData title="Rated" content={movieData.Rated} />
            <CardData title="Awards" content={movieData.Awards} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 180,
  },
});
