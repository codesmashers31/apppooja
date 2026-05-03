import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 15;
const ITEM_WIDTH = (width - (PADDING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

const CATEGORIES = [
  { id: '1', name: 'Pooja Essentials', image: require('../images/camphor.jpg') },
  { id: '2', name: 'Fragrances', image: require('../images/incense & dhoop.jpg') },
  { id: '3', name: 'Brass Items', image: require('../images/bell.jpg') },
  { id: '4', name: 'Auspicious Powders', image: require('../images/kumkum & haldi.jpg') },
];

const CategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
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
