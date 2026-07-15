import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import PlatformSafeAreaView from '../utils/safeAreaHelper';
import { useAuth } from '../context/AuthContext';
import { formatRupiah } from '../utils/currency';
import { ArrowLeft, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { toggleWishlist, isWishlisted } = useAuth();
  const [selectedImage, setSelectedImage] = useState(
    product.thumbnail || (product.images && product.images[0])
  );

  const wishlisted = isWishlisted(product.id);

  const renderStars = (rating) => {
    const filled = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={i < filled ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    ));
  };

  const stockStatus = () => {
    if (!product.stock || product.stock === 0) {
      return { label: 'Stok Habis', color: '#EF4444', bg: '#FEE2E2' };
    }
    if (product.stock <= 10) {
      return { label: `Sisa ${product.stock}`, color: '#F59E0B', bg: '#FEF3C7' };
    }
    return { label: 'Tersedia', color: '#22C55E', bg: '#DCFCE7' };
  };

  const stock = stockStatus();

  return (
    <PlatformSafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Custom back header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          Detail Produk
        </Text>
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => toggleWishlist(product)}
        >
          <Heart 
            size={20} 
            color={wishlisted ? "#EF4444" : "#9CA3AF"} 
            fill={wishlisted ? "#EF4444" : "transparent"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={selectedImage}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Image Thumbnails */}
        {product.images && product.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailScroll}
          >
            {product.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(img)}
                style={[
                  styles.thumbnail,
                  selectedImage === img && styles.thumbnailActive,
                ]}
              >
                <Image
                  source={img}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Content */}
        <View style={styles.content}>
          {/* Category & Stock */}
          <View style={styles.topRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
            <View style={[styles.stockBadge, { backgroundColor: stock.bg }]}>
              <Text style={[styles.stockText, { color: stock.color }]}>
                {stock.label}
              </Text>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.productName}>{product.title}</Text>

          {/* Brand */}
          {product.brand && (
            <Text style={styles.brand}>by {product.brand}</Text>
          )}

          {/* Rating */}
          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars(product.rating)}</View>
            <Text style={styles.ratingValue}>{product.rating?.toFixed(1)}</Text>
            <Text style={styles.ratingCount}>/ 5.0</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatRupiah(product.price)}</Text>
            {product.discountPercentage > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  -{Math.round(product.discountPercentage)}% OFF
                </Text>
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <InfoItem label="Stok" value={`${product.stock} unit`} />
            <InfoItem label="Brand" value={product.brand || 'N/A'} />
            <InfoItem label="Kategori" value={product.category} />
            <InfoItem label="Rating" value={`${product.rating} / 5`} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Harga</Text>
          <Text style={styles.bottomPriceValue}>{formatRupiah(product.price)}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.wishlistCTA,
            wishlisted && styles.wishlistCTAActive,
          ]}
          onPress={() => toggleWishlist(product)}
          activeOpacity={0.85}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Heart size={18} color="#FFFFFF" fill={wishlisted ? "#FFFFFF" : "transparent"} style={{ marginRight: 8 }} />
            <Text style={styles.wishlistCTAText}>
              {wishlisted ? 'Tersimpan' : 'Simpan ke Wishlist'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     </PlatformSafeAreaView>
   );
 };

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} numberOfLines={2}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
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
  navTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginHorizontal: 12,
  },
  wishlistBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 280,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: width,
    height: 280,
  },
  thumbnailScroll: {
    padding: 16,
    gap: 10,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: '#22C55E',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  categoryBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 30,
    marginBottom: 6,
  },
  brand: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  starFilled: {
    color: '#F59E0B',
    fontSize: 16,
  },
  starEmpty: {
    color: '#D1D5DB',
    fontSize: 16,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  ratingCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  discountBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    width: '46%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  bottomPrice: {
    marginRight: 16,
  },
  bottomPriceLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  wishlistCTA: {
    flex: 1,
    height: 52,
    backgroundColor: '#22C55E',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  wishlistCTAActive: {
    backgroundColor: '#15803D',
  },
  wishlistCTAText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default DetailScreen;