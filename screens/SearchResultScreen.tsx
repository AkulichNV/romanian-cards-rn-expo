import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, Alert, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCardContext } from '../context/CardContext';
import { translate } from '../utils/translate';
import { fetchImage } from '../utils/fetchImage';
// import { generateImage } from '../utils/generateImage';

import { Card } from '../types/Card';
import TAGS from '@/assets/data/tags';

export function SearchResultScreen() {
  const { word } = useLocalSearchParams<{ word: string }>();
  const { addCard } = useCardContext();

  const [roWord, setRoWord] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [customTranslation, setCustomTranslation] = useState('');
  const [selectedTag, setSelectedTag] = useState(TAGS[0]);

  useEffect(() => {
    if (word) {
      (async () => {
        const translated = await translate(word, 'ro');
        setRoWord(translated);
        const images = await fetchImage(word);
        setImageUrls(images);
      })();
    }
  }, [word]);

  const handleSave = () => {
  const newCard: Card = {
    ru: word,
    ro: customTranslation || roWord,
    tag: selectedTag,
    image: imageUrls,
  };
  addCard(newCard);
  Alert.alert('Сохранено!', `Карточка "${newCard.ro}" добавлена.`);
};

return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Перевод: {roWord}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
  {imageUrls.map((url, index) => (
    <Pressable
      key={index}
      onPress={() => setSelectedImage(url)}
      style={{
        borderWidth: selectedImage === url ? 2 : 0,
        borderColor: 'blue',
      }}
    >
      <Image
        source={{ uri: url }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
    </Pressable>
  ))}
</View>

      <TextInput
        placeholder="Введите свой перевод (если нужно)"
        value={customTranslation}
        onChangeText={setCustomTranslation}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />
      <Text style={{ fontSize: 16 }}>Тема:</Text>
      {TAGS.map((tag) => (
        <Button
          key={tag}
          title={tag}
          onPress={() => setSelectedTag(tag)}
          color={selectedTag === tag ? '#007AFF' : '#ccc'}
        />
      ))}
      <View style={{ marginTop: 20 }}>
        {/* <Button title="🔊 Озвучить" onPress={handleSpeak} /> */}
        <Button title="💾 Сохранить карточку" onPress={handleSave} />
      </View>
    </View>
  );

}