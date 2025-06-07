import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ArrowLeft, Search, Star, X } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const allItems = [
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
  {
    id: 9,
    name: 'Earl Grey',
    description: 'Classic bergamot tea',
    price: 3.25,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tea'
  },
  {
    id: 10,
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake',
    price: 4.00,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts'
  },
];

const recentSearches = ['Cappuccino', 'Latte', 'Cold Brew', 'Green Tea'];
const popularSearches = ['Mocha', 'Americano', 'Frappuccino', 'Earl Grey', 'Croissant'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
      setShowResults(true);
    } else {
      setFilteredItems([]);
      setShowResults(false);
    }
  }, [searchQuery]);

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

  const handleSearchSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
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
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee, tea, desserts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!showResults ? (
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.suggestionsContainer}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => handleSearchSuggestion(search)}
                  >
                    <Text style={styles.suggestionText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.suggestionsContainer}>
                {popularSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => handleSearchSuggestion(search)}
                  >
                    <Text style={styles.suggestionText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Items */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              <View style={styles.trendingContainer}>
                {allItems.slice(0, 4).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.trendingItem}
                    onPress={() => handleItemPress(item)}
                  >
                    <Image source={{ uri: item.image }} style={styles.trendingImage} />
                    <View style={styles.trendingInfo}>
                      <Text style={styles.trendingName}>{item.name}</Text>
                      <Text style={styles.trendingCategory}>{item.category}</Text>
                      <View style={styles.trendingFooter}>
                        <View style={styles.ratingContainer}>
                          <Star size={12} color="#FCD34D" fill="#FCD34D" />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.trendingPrice}>${item.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Search Results */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {filteredItems.length} results for "{searchQuery}"
            </Text>
            {filteredItems.length > 0 ? (
              <View style={styles.resultsContainer}>
                {filteredItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.resultItem}
                    onPress={() => handleItemPress(item)}
                  >
                    <Image source={{ uri: item.image }} style={styles.resultImage} />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultName}>{item.name}</Text>
                      <Text style={styles.resultDescription}>{item.description}</Text>
                      <Text style={styles.resultCategory}>{item.category}</Text>
                      <View style={styles.resultFooter}>
                        <View style={styles.ratingContainer}>
                          <Star size={14} color="#FCD34D" fill="#FCD34D" />
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                        <Text style={styles.resultPrice}>${item.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No items found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try searching for something else
                </Text>
              </View>
            )}
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
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  suggestionText: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  trendingContainer: {
    gap: 12,
  },
  trendingItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  trendingInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  trendingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  trendingCategory: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  trendingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  trendingPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
  resultsContainer: {
    gap: 12,
  },
  resultItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  resultInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 12,
    color: '#22C55E',
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
});