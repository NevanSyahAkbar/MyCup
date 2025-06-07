import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, MapPin, Plus, MoveHorizontal as MoreHorizontal, Chrome as Home, Briefcase, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const savedAddresses = [
  {
    id: 1,
    type: 'home',
    label: 'Home',
    address: '123 Main Street',
    city: 'Downtown',
    zipCode: '12345',
    isDefault: true,
  },
  {
    id: 2,
    type: 'work',
    label: 'Work',
    address: '456 Business Ave',
    city: 'Business District',
    zipCode: '67890',
    isDefault: false,
  },
  {
    id: 3,
    type: 'other',
    label: 'Coffee Shop',
    address: '789 Coffee Street',
    city: 'Cafe District',
    zipCode: '54321',
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState(savedAddresses);

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home size={20} color="#6B7280" />;
      case 'work':
        return <Briefcase size={20} color="#6B7280" />;
      default:
        return <MapPin size={20} color="#6B7280" />;
    }
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
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
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Address */}
        <TouchableOpacity style={styles.addButton}>
          <View style={styles.addIcon}>
            <Plus size={24} color="#22C55E" />
          </View>
          <Text style={styles.addText}>Add New Address</Text>
        </TouchableOpacity>

        {/* Saved Addresses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Addresses</Text>
          <View style={styles.addressesContainer}>
            {addresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressLeft}>
                  <View style={styles.addressIcon}>
                    {getAddressIcon(address.type)}
                  </View>
                  <View style={styles.addressInfo}>
                    <View style={styles.addressHeader}>
                      <Text style={styles.addressLabel}>{address.label}</Text>
                      {address.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
                          <Text style={styles.defaultText}>Default</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.addressText}>{address.address}</Text>
                    <Text style={styles.addressCity}>
                      {address.city}, {address.zipCode}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <MapPin size={24} color="#22C55E" />
              </View>
              <Text style={styles.actionTitle}>Use Current Location</Text>
              <Text style={styles.actionSubtitle}>Automatically detect your location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Home size={24} color="#3B82F6" />
              </View>
              <Text style={styles.actionTitle}>Add Home Address</Text>
              <Text style={styles.actionSubtitle}>Set your home for quick orders</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Briefcase size={24} color="#F59E0B" />
              </View>
              <Text style={styles.actionTitle}>Add Work Address</Text>
              <Text style={styles.actionSubtitle}>Set your workplace address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>📍 Location Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Add multiple addresses for faster checkout</Text>
            <Text style={styles.tipItem}>• Set a default address for quick orders</Text>
            <Text style={styles.tipItem}>• Include apartment/suite numbers for accuracy</Text>
            <Text style={styles.tipItem}>• Use descriptive labels like "Home" or "Office"</Text>
          </View>
        </View>
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
  addButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#22C55E',
    borderStyle: 'dashed',
  },
  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C55E15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  addressesContainer: {
    gap: 12,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginRight: 8,
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  addressCity: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  moreButton: {
    padding: 4,
  },
  actionsContainer: {
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
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
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
    flex: 1,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  tipsContainer: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 12,
    color: '#1E40AF',
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
});