import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, ListRenderItem } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { RootState, AppDispatch } from '../redux/store';
import { Product } from '../types/types';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const PADDING = 10;
const ITEM_WIDTH = (width - (PADDING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

const ProductsScreen = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = (product: Product) => {
    dispatch(addToCart(product));
    Alert.alert('Added', `${product.name} added to cart`);
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
              <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: PADDING / 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: ITEM_WIDTH - 20, 
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#D84315',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionRow: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D84315',
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#D84315',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
