import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Heart } from 'lucide-react-native';

/**
 * ProductCard - Premium product list card.
 * Props:
 *   product (object) - product data
 *   onPress (func) - navigate to detail
 */
const ProductCard = ({ product, onPress }) => {
  const { toggleWishlist, isWishlisted } = useAuth();
  const wishlisted = isWishlisted(product.id);

  const renderStars = (rating) => {
    const filled = Math.round(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={i < filled ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    ));
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.92}
    >
      {/* Thumbnail */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Wishlist heart button */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleWishlist(product)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Heart 
            size={18} 
            color={wishlisted ? "#EF4444" : "#9CA3AF"} 
            fill={wishlisted ? "#EF4444" : "transparent"} 
          />
        </TouchableOpacity>

        {/* Discount badge */}
        {product.discountPercentage > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        {/* Category */}
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>

        {/* Product name */}
        <Text style={styles.name} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars(product.rating)}</View>
          <Text style={styles.ratingText}>{product.rating?.toFixed(1)}</Text>
        </View>

        {/* Price */}
        <Text style={styles.price}>
          ${product.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#F3F4F6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: '#22C55E',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 21,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  starFilled: {
    color: '#F59E0B',
    fontSize: 13,
  },
  starEmpty: {
    color: '#D1D5DB',
    fontSize: 13,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
});

export default ProductCard;
