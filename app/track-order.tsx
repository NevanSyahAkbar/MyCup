import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, MapPin, Clock, CircleCheck as CheckCircle, Package, Truck } from 'lucide-react-native';
import { router } from 'expo-router';

const currentOrder = {
  id: 'ORD-004',
  items: [
    { name: 'Cappuccino', quantity: 1, price: 4.50, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Green Tea Latte', quantity: 1, price: 4.75, image: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ],
  totalAmount: 9.25,
  status: 'preparing',
  estimatedTime: '15-20 min',
  location: 'Downtown Cafe',
  address: '123 Main Street, Downtown',
  orderTime: '2:15 PM',
  currentStep: 2,
};

const orderSteps = [
  {
    id: 1,
    title: 'Order Confirmed',
    description: 'Your order has been received',
    icon: <CheckCircle size={20} color="#22C55E" />,
    completed: true,
    time: '2:15 PM',
  },
  {
    id: 2,
    title: 'Preparing',
    description: 'Your coffee is being prepared',
    icon: <Package size={20} color="#F59E0B" />,
    completed: false,
    active: true,
    time: 'In progress',
  },
  {
    id: 3,
    title: 'Ready for Pickup',
    description: 'Your order is ready',
    icon: <CheckCircle size={20} color="#9CA3AF" />,
    completed: false,
    time: 'Estimated 2:35 PM',
  },
  {
    id: 4,
    title: 'Completed',
    description: 'Order picked up',
    icon: <Truck size={20} color="#9CA3AF" />,
    completed: false,
    time: '',
  },
];

export default function TrackOrderScreen() {
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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Info */}
        <View style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderNumber}>Order #{currentOrder.id}</Text>
            <Text style={styles.orderTime}>Placed at {currentOrder.orderTime}</Text>
          </View>

          <View style={styles.estimatedTimeContainer}>
            <Clock size={24} color="#22C55E" />
            <View style={styles.timeInfo}>
              <Text style={styles.estimatedLabel}>Estimated Time</Text>
              <Text style={styles.estimatedTime}>{currentOrder.estimatedTime}</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={24} color="#22C55E" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{currentOrder.location}</Text>
              <Text style={styles.locationAddress}>{currentOrder.address}</Text>
            </View>
          </View>
        </View>

        {/* Order Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Order Progress</Text>
          <View style={styles.progressContainer}>
            {orderSteps.map((step, index) => (
              <View key={step.id} style={styles.progressStep}>
                <View style={styles.stepLeft}>
                  <View style={[
                    styles.stepIcon,
                    step.completed && styles.completedIcon,
                    step.active && styles.activeIcon,
                  ]}>
                    {step.icon}
                  </View>
                  {index < orderSteps.length - 1 && (
                    <View style={[
                      styles.stepLine,
                      step.completed && styles.completedLine,
                    ]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[
                    styles.stepTitle,
                    step.completed && styles.completedText,
                    step.active && styles.activeText,
                  ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.itemsCard}>
          <Text style={styles.itemsTitle}>Order Items</Text>
          {currentOrder.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${currentOrder.totalAmount}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Call Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          </TouchableOpacity>
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
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  estimatedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E15',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  timeInfo: {
    marginLeft: 12,
  },
  estimatedLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  estimatedTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#22C55E',
    fontFamily: 'Inter-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  progressContainer: {
    paddingLeft: 8,
  },
  progressStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  completedIcon: {
    backgroundColor: '#22C55E15',
  },
  activeIcon: {
    backgroundColor: '#F59E0B15',
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  completedLine: {
    backgroundColor: '#22C55E',
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  completedText: {
    color: '#22C55E',
  },
  activeText: {
    color: '#F59E0B',
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  stepTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    fontFamily: 'Inter-SemiBold',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});