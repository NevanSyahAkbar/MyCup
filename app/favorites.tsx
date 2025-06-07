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
import { ArrowLeft, Heart, Star, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const favoriteItems = [
  {
    id: 1,
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk',
    price: 4.50,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hot Coffee'
  },
  {
    id: 4,
    name: 'Mocha',
    description: 'Chocolate infused coffee delight',
    price: 5.00,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hot Coffee'
  },
  {
    id: 7,
    name: 'Green Tea Latte',
    description: 'Matcha green tea with milk',
    price: 4.75,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tea'
  },
  {
    id: 8,
    name: 'Croissant',
    description: 'Buttery French pastry',
    price: 2.50,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts'
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(favoriteItems);

  const handleItemPress = (item: any) => {
    router.push({
      pathname: '/coffee-detail',
      params: { 
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        image: item.image,
        category: item.category
      }
    });
  };

  const removeFavorite = (itemId: number) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const addToCart = (item: any) => {
    // Handle add to cart
    console.log('Added to cart:', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length > 0 ? (
          <>
            <View style={styles.headerInfo}>
              <Text style={styles.itemCount}>{favorites.length} favorite items</Text>
              <Text style={styles.subtitle}>Your most loved coffee selections</Text>
            </View>

            <View style={styles.favoritesGrid}>
              {favorites.map((item) => (
                <View key={item.id} style={styles.favoriteCard}>
                  <TouchableOpacity onPress={() => handleItemPress(item)}>
                    <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                    <TouchableOpacity 
                      style={styles.heartButton}
                      onPress={() => removeFavorite(item.id)}
                    >
                      <Heart size={20} color="#EF4444" fill="#EF4444" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  
                  <View style={styles.favoriteInfo}>
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                      <Text style={styles.favoriteName}>{item.name}</Text>
                      <Text style={styles.favoriteDescription}>{item.description}</Text>
                      <Text style={styles.favoriteCategory}>{item.category}</Text>
                      
                      <View style={styles.favoriteFooter}>
                        <View style={styles.ratingContainer}>
                          <Star size={14} color="#FCD34D" fill="#FCD34D" />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.favoritePrice}>${item.price}</Text>
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Plus size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Heart size={48} color="#E5E7EB" />
            </View>
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start adding items to your favorites by tapping the heart icon on any coffee or dessert
            </Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)/menu')}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
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
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerInfo: {
    marginBottom: 24,
  },
  itemCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  favoriteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    width: (width - 52) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  favoriteImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  favoriteDescription: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  favoriteCategory: {
    fontSize: 11,
    color: '#22C55E',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  favoriteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  favoritePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    backgroundColor: '#22C55E',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  browseButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});