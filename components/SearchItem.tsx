import { Card } from "react-native-paper";
import { Search } from "../types/movieTypes";

const SearchItem = ({ item }: { item: Search }) => {
  return (
    <Card>
      <Card.Cover source={{ uri: item.Poster }} resizeMode="contain" />
      <Card.Title title={item.Title} subtitle={item.Year} />
    </Card>
  );
};


export default SearchItem