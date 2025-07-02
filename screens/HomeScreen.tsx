import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from '../components/SearchBar';
import { TagSection } from '../components/TagSection';

const TAGS = ['Животные', 'Цыфры', 'Одежда', 'Цвета'];

export const HomeScreen = () => {
  const router = useRouter();

  const handleSearch = (word: string) => {
    if (word) {
      router.push(`/search/${encodeURIComponent(word)}`);
    }
  };

  const handleTagPress = (tag: string) => {
    router.push(`/tag/${encodeURIComponent(tag)}`);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Поиск слова</Text>
      <SearchBar onSearch={handleSearch} />
      <Text style={{ marginTop: 20, fontSize: 20 }}>Темы для изучения:</Text>
      <TagSection tags={TAGS} onSelectTag={handleTagPress} />
    </View>
  );
}
