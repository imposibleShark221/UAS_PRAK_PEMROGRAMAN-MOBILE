import React from 'react';
import { Trash2, Heart } from 'lucide-react-native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import PlatformSafeAreaView from '../utils/safeAreaHelper';
import { useAuth } from '../context/AuthContext';
import { formatRupiah } from '../utils/currency';
import EmptyState from '../components/EmptyState';

const WishlistScreen = ({ navigation }) => {
  const { wishlist, removeFromWishlist } = useAuth();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HomeStack', {
        screen: 'Detail',
        params: { product: item },
      })}
      activeOpacity={0.9}
    >
      <Image
        source={item.thumbnail}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatRupiah(item.price)}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Trash2 size={20} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <PlatformSafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Wishlist </Text>
          <Heart size={20} color="#111827" fill="#111827" />
        </View>
        <Text style={styles.headerCount}>
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[
          styles.listContent,
          wishlist.length === 0 && styles.listEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={<Heart size={40} color="#9CA3AF" />}
            title="Wishlist kosong"
            subtitle="Tekan ikon hati pada produk untuk menambahkannya ke wishlist"
          />
        }
      />
    </PlatformSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  headerCount: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    backgroundColor: '#F3F4F6',
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 19,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  removeButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WishlistScreen;