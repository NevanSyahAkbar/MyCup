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
  TextInput,
} from 'react-native';
import { Search, Bell, Star, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const coffeeItems = [
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
    id: 2,
    name: 'Latte',
    description: 'Smooth espresso with milk foam',
    price: 4.25,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Hot Coffee'
  },
  {
    id: 3,
    name: 'Americano',
    description: 'Classic black coffee',
    price: 3.75,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=400',
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
];

const coldBrewItems = [
  {
    id: 5,
    name: 'Iced Coffee',
    description: 'Refreshing cold coffee',
    price: 3.50,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cold Brew'
  },
  {
    id: 6,
    name: 'Frappuccino',
    description: 'Blended iced coffee drink',
    price: 5.50,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cold Brew'
  },
];

const dessertItems = [
  {
    id: 7,
    name: 'Croissant',
    description: 'Buttery French pastry',
    price: 2.50,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts'
  },
  {
    id: 8,
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake',
    price: 4.00,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts'
  },
];

const teaItems = [
  {
    id: 9,
    name: 'Green Tea Latte',
    description: 'Matcha green tea with milk',
    price: 4.75,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tea'
  },
  {
    id: 10,
    name: 'Earl Grey',
    description: 'Classic bergamot tea',
    price: 3.25,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tea'
  },
];

const categories = [
  { id: 'hot-coffee', name: 'Hot Coffee', items: coffeeItems },
  { id: 'cold-brew', name: 'Cold Brew', items: coldBrewItems },
  { id: 'desserts', name: 'Desserts', items: dessertItems },
  { id: 'tea', name: 'Tea', items: teaItems },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCoffeePress = (coffee: any) => {
    router.push({
      pathname: '/coffee-detail',
      params: { 
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        price: coffee.price,
        rating: coffee.rating,
        image: coffee.image,
        category: coffee.category
      }
    });
  };

  const handleOrderNow = () => {
    router.push('/(tabs)/menu');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleSearch = () => {
    router.push('/search');
  };

  const handleSeeAll = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)/menu',
      params: { category: categoryId }
    });
  };

  const renderCategorySection = (category: any) => (
    <View key={category.id} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{category.name}</Text>
        <TouchableOpacity onPress={() => handleSeeAll(category.id)}>
          <View style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <ArrowRight size={16} color="#22C55E" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {category.items.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            style={styles.horizontalCard}
            onPress={() => handleCoffeePress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.horizontalImage} />
            <View style={styles.horizontalInfo}>
              <Text style={styles.horizontalName}>{item.name}</Text>
              <Text style={styles.horizontalDescription}>{item.description}</Text>
              <View style={styles.horizontalFooter}>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#FCD34D" fill="#FCD34D" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.horizontalPrice}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good Morning ☀️</Text>
              <Text style={styles.username}>Sarah</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton} onPress={handleNotifications}>
              <Bell size={24} color="#374151" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Elevate your coffee{'\n'}experience with us</Text>
            <Text style={styles.heroSubtitle}>Discover premium coffee blends crafted just for you</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={handleOrderNow}>
              <Text style={styles.ctaButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroImageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.heroImage}
            />
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={[styles.heroImage, styles.heroImageSecond]}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar} onPress={handleSearch}>
            <Search size={20} color="#9CA3AF" />
            <Text style={styles.searchPlaceholder}>Search your favorite coffee...</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Sections */}
        {categories.map(renderCategorySection)}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  heroSection: {
    backgroundColor: '#22C55E',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    marginTop: 8,
    opacity: 0.9,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: '#22C55E',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  heroImageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  heroImageSecond: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  seeAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#22C55E',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginRight: 4,
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  horizontalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  horizontalImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  horizontalInfo: {
    flex: 1,
  },
  horizontalName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  horizontalDescription: {
    fontSize: 11,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  horizontalPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
});