import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { fetchUserOrders } from '../services/order';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';

const OrdersScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUserOrders(user.id);
      setOrders(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const renderProduct = (product) => (
    <View key={product.id} style={styles.productRow}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productMeta}>
          {product.quantity}x &bull; ${product.price?.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.productTotal}>
        ${product.total?.toFixed(2)}
      </Text>
    </View>
  );

  const renderOrder = ({ item, index }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Pesanan #{item.id}</Text>
          <Text style={styles.orderDate}>
            {item.products?.length} produk
          </Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>
            ${item.total?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      {item.products?.map((p) => renderProduct(p))}
      <View style={styles.orderFooter}>
        <Text style={styles.discountText}>
          Diskon: -${item.discountedTotal
            ? (item.total - item.discountedTotal).toFixed(2)
            : '0.00'}
        </Text>
        <Text style={styles.finalTotal}>
          Total Bayar: ${item.discountedTotal?.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pesanan Saya</Text>
        <View style={{ width: 36 }} />
      </View>

      {isLoading ? (
        <Loading message="Memuat pesanan..." />
      ) : error ? (
        <ErrorState onRetry={loadOrders} />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={[
            styles.listContent,
            orders.length === 0 && styles.listEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon={<ShoppingBag size={40} color="#9CA3AF" />}
              title="Belum ada pesanan"
              subtitle="Produk yang kamu beli akan muncul di sini"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  listEmpty: {
    flexGrow: 1,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  orderDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  totalBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  totalBadgeText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16A34A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  productInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 18,
  },
  productMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  productTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  orderFooter: {
    padding: 16,
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
  },
  discountText: {
    fontSize: 12,
    color: '#22C55E',
    fontWeight: '600',
    marginBottom: 4,
  },
  finalTotal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
});

export default OrdersScreen;
