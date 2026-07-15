import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import PlatformSafeAreaView from '../utils/safeAreaHelper';
import { fetchProducts } from '../services/product';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { ShoppingCart, Search, X, Package } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('[HomeScreen] Error loading products:', err);
      setError(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Extract unique categories from product list
  const categories = useMemo(() => {
    const cats = ['Semua', ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  // Filter products by search query and selected category
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'Semua') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory]);

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('Detail', { product: item })}
    />
  );

  const keyExtractor = (item) => String(item.id);

  if (isLoading) return <Loading message="Memuat produk..." />;

  if (error && products.length === 0) {
    return (
      <ErrorState
        onRetry={() => loadProducts()}
      />
    );
  }

  return (
    <PlatformSafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.greeting}>KampusMarket </Text>
            <ShoppingCart size={22} color="#111827" />
          </View>
          <Text style={styles.subGreeting}>
            {filteredProducts.length} produk ditemukan
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={16} color="#6B7280" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari produk, kategori, brand..."
            placeholderTextColor="#9CA3AF"
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color="#9CA3AF" style={{ padding: 4 }} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.listContent,
          filteredProducts.length === 0 && styles.listEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={searchQuery ? <Search size={40} color="#9CA3AF" /> : <Package size={40} color="#9CA3AF" />}
            title={searchQuery ? 'Produk tidak ditemukan' : 'Belum ada produk'}
            subtitle={
              searchQuery
                ? `Tidak ada hasil untuk "${searchQuery}"`
                : 'Coba lagi nanti'
            }
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadProducts(true)}
            tintColor="#22C55E"
            colors={['#22C55E']}
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </PlatformSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryChipTextActive: {
    color: '#16A34A',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
  },
});

export default HomeScreen;
