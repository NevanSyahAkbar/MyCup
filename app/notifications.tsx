import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Coffee, Gift, Bell, CircleCheck as CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Ready for Pickup',
    message: 'Your Cappuccino order #ORD-004 is ready for pickup at Downtown Cafe',
    time: '5 minutes ago',
    read: false,
    icon: <Coffee size={20} color="#22C55E" />,
    backgroundColor: '#22C55E15',
  },
  {
    id: 2,
    type: 'promotion',
    title: 'Special Offer Just for You!',
    message: 'Get 20% off on all Cold Brew drinks. Valid until tomorrow!',
    time: '1 hour ago',
    read: false,
    icon: <Gift size={20} color="#F59E0B" />,
    backgroundColor: '#F59E0B15',
  },
  {
    id: 3,
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #ORD-003 has been confirmed and is being prepared',
    time: '2 hours ago',
    read: true,
    icon: <CheckCircle size={20} color="#3B82F6" />,
    backgroundColor: '#3B82F615',
  },
  {
    id: 4,
    type: 'general',
    title: 'New Menu Items Available',
    message: 'Check out our new seasonal drinks and desserts now available',
    time: '1 day ago',
    read: true,
    icon: <Bell size={20} color="#8B5CF6" />,
    backgroundColor: '#8B5CF615',
  },
  {
    id: 5,
    type: 'promotion',
    title: 'Loyalty Points Earned',
    message: 'You earned 50 points from your recent purchase. Total: 1,250 points',
    time: '2 days ago',
    read: true,
    icon: <Gift size={20} color="#F59E0B" />,
    backgroundColor: '#F59E0B15',
  },
  {
    id: 6,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #ORD-002 has been successfully delivered',
    time: '3 days ago',
    read: true,
    icon: <CheckCircle size={20} color="#10B981" />,
    backgroundColor: '#10B98115',
  },
];

export default function NotificationsScreen() {
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationPress = (notification: any) => {
    if (notification.type === 'order') {
      router.push('/track-order');
    }
  };

  const markAllAsRead = () => {
    // Handle mark all as read
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <View style={styles.unreadContainer}>
          <Text style={styles.unreadText}>
            You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification
            ]}
            onPress={() => handleNotificationPress(notification)}
          >
            <View style={[styles.iconContainer, { backgroundColor: notification.backgroundColor }]}>
              {notification.icon}
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              {!notification.read && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))}
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
  markAllText: {
    color: '#22C55E',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  unreadContainer: {
    backgroundColor: '#22C55E15',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  unreadText: {
    color: '#22C55E',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#FEFEFE',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    color: '#111827',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
});