import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, Package, MapPin } from 'lucide-react-native';

const orderHistory = [
  {
    id: 1,
    orderNumber: '#ORD-001',
    items: [
      { name: 'Cappuccino', quantity: 2, price: 4.50 },
      { name: 'Croissant', quantity: 1, price: 2.50 }
    ],
    totalAmount: 11.50,
    status: 'delivered',
    date: '2024-01-15',
    time: '10:30 AM',
    location: 'Downtown Cafe',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    orderNumber: '#ORD-002',
    items: [
      { name: 'Latte', quantity: 1, price: 4.25 },
      { name: 'Americano', quantity: 1, price: 3.75 }
    ],
    totalAmount: 8.00,
    status: 'preparing',
    date: '2024-01-15',
    time: '2:15 PM',
    location: 'Main Street Branch',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    orderNumber: '#ORD-003',
    items: [
      { name: 'Mocha', quantity: 1, price: 5.00 }
    ],
    totalAmount: 5.00,
    status: 'ready',
    date: '2024-01-15',
    time: '3:45 PM',
    location: 'Airport Terminal',
    image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
];

const currentOrder = {
  id: 'current',
  orderNumber: '#ORD-004',
  items: [
    { name: 'Cappuccino', quantity: 1, price: 4.50 },
    { name: 'Green Tea Latte', quantity: 1, price: 4.75 }
  ],
  totalAmount: 9.25,
  status: 'confirmed',
  estimatedTime: '15-20 min',
  location: 'Downtown Cafe',
  image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Clock size={16} color="#F59E0B" />;
      case 'preparing':
        return <Package size={16} color="#3B82F6" />;
      case 'ready':
        return <CheckCircle size={16} color="#10B981" />;
      case 'delivered':
        return <CheckCircle size={16} color="#6B7280" />;
      default:
        return <Clock size={16} color="#F59E0B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#F59E0B';
      case 'preparing':
        return '#3B82F6';
      case 'ready':
        return '#10B981';
      case 'delivered':
        return '#6B7280';
      default:
        return '#F59E0B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={[styles.tabText, activeTab === 'current' && styles.activeTabText]}>
            Current Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Order History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {activeTab === 'current' ? (
          /* Current Order */
          <View style={styles.section}>
            <View style={styles.currentOrderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>{currentOrder.orderNumber}</Text>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(currentOrder.status)}15` }]}>
                  {getStatusIcon(currentOrder.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(currentOrder.status) }]}>
                    {getStatusText(currentOrder.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.trackingInfo}>
                <View style={styles.trackingItem}>
                  <View style={styles.trackingIconContainer}>
                    <Clock size={20} color="#22C55E" />
                  </View>
                  <View style={styles.trackingContent}>
                    <Text style={styles.trackingTitle}>Estimated Time</Text>
                    <Text style={styles.trackingSubtitle}>{currentOrder.estimatedTime}</Text>
                  </View>
                </View>

                <View style={styles.trackingItem}>
                  <View style={styles.trackingIconContainer}>
                    <MapPin size={20} color="#22C55E" />
                  </View>
                  <View style={styles.trackingContent}>
                    <Text style={styles.trackingTitle}>Pickup Location</Text>
                    <Text style={styles.trackingSubtitle}>{currentOrder.location}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.orderItems}>
                <Text style={styles.itemsTitle}>Order Items</Text>
                {currentOrder.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Image source={{ uri: currentOrder.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.orderTotal}>
                <Text style={styles.totalText}>Total: ${currentOrder.totalAmount}</Text>
              </View>

              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Order History */
          <View style={styles.section}>
            {orderHistory.map((order) => (
              <TouchableOpacity key={order.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View>
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                    <Text style={styles.orderDate}>{order.date} • {order.time}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}15` }]}>
                    {getStatusIcon(order.status)}
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.historyItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.historyItem}>
                      <Text style={styles.historyItemText}>
                        {item.quantity}x {item.name}
                      </Text>
                      <Text style={styles.historyItemPrice}>${item.price}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.historyFooter}>
                  <View style={styles.locationInfo}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{order.location}</Text>
                  </View>
                  <Text style={styles.totalAmount}>Total: ${order.totalAmount}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  currentOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  trackingInfo: {
    marginBottom: 20,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#22C55E15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trackingContent: {
    flex: 1,
  },
  trackingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  trackingSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  orderItems: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  itemQuantity: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22C55E',
    fontFamily: 'Inter-SemiBold',
  },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    textAlign: 'right',
  },
  trackButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  historyItems: {
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyItemText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  historyItemPrice: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
});