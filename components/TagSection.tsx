import { FlatList, Pressable, Text } from 'react-native';

interface ITagSection {
  tags: string[];
  onSelectTag: (tag: string) => void;
};

export const TagSection = ({ tags, onSelectTag }: ITagSection) => {
  return (
    <FlatList
      data={tags}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Pressable
          style={{
            padding: 12,
            backgroundColor: '#eee',
            borderRadius: 8,
            marginTop: 10,
          }}
          onPress={() => onSelectTag(item)}
        >
          <Text>{item}</Text>
        </Pressable>
      )}
    />
  );
}
