import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ArrowLeft, Heart, Star, Plus, Minus } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

const sizes = [
  { id: 'S', name: 'Small', price: 0 },
  { id: 'M', name: 'Medium', price: 0.5 },
  { id: 'L', name: 'Large', price: 1.0 },
];

const extras = [
  { id: 'extra-shot', name: 'Extra Shot', price: 0.75 },
  { id: 'decaf', name: 'Decaf', price: 0 },
  { id: 'oat-milk', name: 'Oat Milk', price: 0.6 },
  { id: 'vanilla', name: 'Vanilla Syrup', price: 0.5 },
  { id: 'caramel', name: 'Caramel Syrup', price: 0.5 },
];

export default function CoffeeDetailScreen() {
  const params = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const coffee = {
    id: params.id,
    name: params.name as string,
    description: params.description as string,
    price: parseFloat(params.price as string),
    rating: parseFloat(params.rating as string),
    image: params.image as string,
    category: params.category as string,
  };

  const calculateTotalPrice = () => {
    let total = coffee.price;
    
    // Add size price
    const sizePrice = sizes.find(size => size.id === selectedSize)?.price || 0;
    total += sizePrice;
    
    // Add extras price
    selectedExtras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });
    
    return total * quantity;
  };

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleAddToCart = () => {
    // Handle add to cart logic here
    console.log('Added to cart:', {
      coffee,
      size: selectedSize,
      extras: selectedExtras,
      quantity,
      totalPrice: calculateTotalPrice(),
    });
    
    // Navigate back or show success message
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart 
              size={24} 
              color={isFavorite ? "#EF4444" : "#374151"}
              fill={isFavorite ? "#EF4444" : "transparent"}
            />
          </TouchableOpacity>
        </View>

        {/* Coffee Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: coffee.image }} style={styles.coffeeImage} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{coffee.category}</Text>
          </View>
        </View>

        {/* Coffee Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{coffee.rating}</Text>
                <Text style={styles.reviewsText}>(230 reviews)</Text>
              </View>
            </View>
            <Text style={styles.basePrice}>${coffee.price}</Text>
          </View>

          <Text style={styles.description}>{coffee.description}</Text>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  style={[
                    styles.sizeOption,
                    selectedSize === size.id && styles.selectedSizeOption
                  ]}
                  onPress={() => setSelectedSize(size.id)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size.id && styles.selectedSizeText
                  ]}>
                    {size.name}
                  </Text>
                  {size.price > 0 && (
                    <Text style={[
                      styles.sizePriceText,
                      selectedSize === size.id && styles.selectedSizePriceText
                    ]}>
                      +${size.price}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Extras */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Extras</Text>
            <View style={styles.extrasContainer}>
              {extras.map((extra) => (
                <TouchableOpacity
                  key={extra.id}
                  style={[
                    styles.extraOption,
                    selectedExtras.includes(extra.id) && styles.selectedExtraOption
                  ]}
                  onPress={() => toggleExtra(extra.id)}
                >
                  <Text style={[
                    styles.extraText,
                    selectedExtras.includes(extra.id) && styles.selectedExtraText
                  ]}>
                    {extra.name}
                  </Text>
                  <Text style={[
                    styles.extraPriceText,
                    selectedExtras.includes(extra.id) && styles.selectedExtraPriceText
                  ]}>
                    {extra.price > 0 ? `+$${extra.price}` : 'Free'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color="#374151" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${calculateTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  coffeeImage: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 16,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 36,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  coffeeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  reviewsText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  basePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeOption: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: '#22C55E',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  sizePriceText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  selectedSizePriceText: {
    color: '#FFFFFF',
  },
  extrasContainer: {
    gap: 8,
  },
  extraOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },
  selectedExtraOption: {
    backgroundColor: '#22C55E',
  },
  extraText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Inter-Medium',
  },
  selectedExtraText: {
    color: '#FFFFFF',
  },
  extraPriceText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  selectedExtraPriceText: {
    color: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalContainer: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  addToCartButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});