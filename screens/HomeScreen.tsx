import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SearchBar } from '../components/SearchBar';
import { TagSection } from '../components/TagSection';

import TAGS from '@/assets/data/tags';

export const HomeScreen = () => {
  const router = useRouter();

  const handleSearch = (word: string) => {
    if (word) {
      router.push({
        pathname: '/search/[word]',
        params: { word },
        });
    }
  };

  const handleTagPress = (tag: string) => {
    router.push({
        pathname: '/tag/[tag]',
        params: { tag },
        });
    // router.push(`/tag/${encodeURIComponent(tag)}`);
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
