import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const PROMOS = [
  {
    id: 1,
    title: 'Flash Sale 24 Jam',
    description: 'Diskon spesial hanya untuk produk terpilih',
    badge: 'Diskon 70%',
    badgeColor: '#EF4444',
    bgColor: '#FEF3F2',
    image: require('../assets/promo1.png'),
  },
  {
    id: 2,
    title: 'Gratis Ongkir Seluruh Indonesia',
    description: 'Minimal belanja Rp50.000, semua kota',
    badge: 'Gratis Ongkir',
    badgeColor: '#10B981',
    bgColor: '#F0FDF4',
    image: require('../assets/promo2.png'),
  },
  {
    id: 3,
    title: 'Cashback 30% untuk Pembayaran pertama',
    description: 'Maksimal cashback Rp50.000',
    badge: 'Cashback 30%',
    badgeColor: '#3B82F6',
    bgColor: '#EFF6FF',
    image: require('../assets/promo3.png'),
  },
  {
    id: 4,
    title: 'Diskon 50% Fashion Terkini',
    description: 'Koleksi baru dari brand terkemuka',
    badge: 'Diskon 50%',
    badgeColor: '#EC4899',
    bgColor: '#FDF2F8',
    image: require('../assets/promo4.png'),
  },
];

const PromoScreen = ({ navigation }) => {
  const renderPromoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.promoCard}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.promoImage} />
      <View style={styles.promoContent}>
        <Text style={[styles.promoBadge, { backgroundColor: item.badgeColor + '20' }]}>
          {item.badge}
        </Text>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Promo & Penawaran</Text>
      </View>
      <FlatList
        data={PROMOS}
        renderItem={renderPromoItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: '#03AC0E',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  promoCard: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  promoImage: {
    width: '100%',
    height: 120,
  },
  promoContent: {
    padding: 12,
  },
  promoBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    display: 'inline-block',
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default PromoScreen;