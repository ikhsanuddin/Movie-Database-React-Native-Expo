import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
} from 'react-native';
import {
  ActivityIndicator,
  Searchbar,
  TouchableRipple,
  HelperText,
} from 'react-native-paper';
import { requestDB } from '../utils/request';
import debounce from 'lodash.debounce';
import { Search } from '../types/movieTypes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchItem from '../components/SearchItem';

const SearchView = ({ navigation }: NativeStackScreenProps<any, 'Search'>) => {
  const [loading, setLoading] = useState(false);
  const [results, setResult] = useState<Search[]>([]);
  const [error, setError] = useState('');

  const search = debounce(async (text: string) => {
    const searchResult = await requestDB({
      params: {
        s: text,
        page: 1,
      },
    });

    setResult(searchResult.Search);
    setLoading(false);
  }, 2000);

  const handleSearch = (text: string) => {
    setError('Type at least 3 characters');
    if (text.length > 2) {
      setError('');
      setLoading(true);
      search(text);
    }
  };

  const hasErrors = () => {
    return true;
  };

  const debounceHandleSearch = debounce(handleSearch, 500);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={results}
        renderItem={({ item }: { item: Search }) => (
          <TouchableRipple
            onPress={() => navigation.navigate('Detail', item)}
            rippleColor="rgba(255, 255, 255, .32)"
            style={styles.card}>
            <SearchItem item={item} />
          </TouchableRipple>
        )}
        keyExtractor={(item) => item.imdbID}
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <Searchbar
        style={styles.input}
        onChangeText={debounceHandleSearch}
        placeholder="Search Movie"
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 10,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginBottom: 10,
  },
});

export default SearchView;
