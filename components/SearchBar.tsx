import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

interface ISearchBar {
  onSearch(word: string): void;
}

export const SearchBar = ({ onSearch }: ISearchBar) => {
    const [text, setText] = useState('');

    return (
    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
      <TextInput
        placeholder="Введите слово"
        value={text}
        onChangeText={setText}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 8,
        }}
      />
      <Button title="Поиск" onPress={() => onSearch(text.trim())} />
    </View>
  );
}