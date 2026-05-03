import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CategoryStackParamList } from '../types/types';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 15;
const ITEM_WIDTH = (width - (PADDING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

interface CategoryData {
  id: string;
  name: string;
  image: any;
}

const CATEGORIES: CategoryData[] = [
  { id: '1', name: 'Pooja Essentials', image: require('../images/camphor.jpg') },
  { id: '2', name: 'Fragrances', image: require('../images/incense & dhoop.jpg') },
  { id: '3', name: 'Brass Items', image: require('../images/bell.jpg') },
  { id: '4', name: 'Auspicious Powders', image: require('../images/kumkum & haldi.jpg') },
];

type Props = NativeStackScreenProps<CategoryStackParamList, 'CategoriesList'>;

const CategoriesScreen = ({ navigation }: Props) => {
  const renderItem: ListRenderItem<CategoryData> = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('CategoryProducts', { categoryName: item.name })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContainer: {
    padding: PADDING,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH + 20,
    margin: PADDING / 2,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoriesScreen;
