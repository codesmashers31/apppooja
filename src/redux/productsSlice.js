import { createSlice } from '@reduxjs/toolkit';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Pan Leaves', unit: '5 pcs', price: 20, category: 'Pooja Essentials', image: require('../images/Pan Leavesjpg.jpg') },
  { id: '2', name: 'Pooja Bell', unit: '1 pc', price: 150, category: 'Brass Items', image: require('../images/bell.jpg') },
  { id: '3', name: 'Camphor', unit: '50g', price: 50, category: 'Pooja Essentials', image: require('../images/camphor.jpg') },
  { id: '4', name: 'Chandanam', unit: '100g', price: 80, category: 'Fragrances', image: require('../images/chandanam.jpg') },
  { id: '5', name: 'Pure Honey', unit: '250ml', price: 120, category: 'Pooja Essentials', image: require('../images/honey.jpg') },
  { id: '6', name: 'Incense & Dhoop', unit: '1 Pack', price: 60, category: 'Fragrances', image: require('../images/incense & dhoop.jpg') },
  { id: '7', name: 'Kalash', unit: '1 pc', price: 250, category: 'Brass Items', image: require('../images/kalash.jpg') },
  { id: '8', name: 'Kumkum & Haldi', unit: '100g', price: 40, category: 'Auspicious Powders', image: require('../images/kumkum & haldi.jpg') },
  { id: '9', name: 'Pooja Lamp', unit: '1 pc', price: 200, category: 'Brass Items', image: require('../images/lamp.jpg') },
  { id: '10', name: 'Navadhanyam', unit: '9 pkts', price: 90, category: 'Pooja Essentials', image: require('../images/navadhanyam.jpg') },
  { id: '11', name: 'Pooja Thali', unit: '1 set', price: 300, category: 'Brass Items', image: require('../images/poojathali.jpg') },
  { id: '12', name: 'Havan Wood Pieces', unit: '1 kg', price: 110, category: 'Pooja Essentials', image: require('../images/woodpieces.jpg') },
];

const initialState = {
  items: MOCK_PRODUCTS,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
