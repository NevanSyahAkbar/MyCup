import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, CreditCard, Plus, MoveHorizontal as MoreHorizontal, Check } from 'lucide-react-native';
import { router } from 'expo-router';

const paymentMethods = [
  {
    id: 1,
    type: 'visa',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'mastercard',
    last4: '8888',
    expiryMonth: '08',
    expiryYear: '26',
    isDefault: false,
  },
  {
    id: 3,
    type: 'apple-pay',
    last4: '',
    expiryMonth: '',
    expiryYear: '',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const [methods, setMethods] = useState(paymentMethods);

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'apple-pay':
        return '📱';
      default:
        return '💳';
    }
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'apple-pay':
        return 'Apple Pay';
      default:
        return 'Card';
    }
  };

  const setDefaultPayment = (id: number) => {
    setMethods(methods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const removePaymentMethod = (id: number) => {
    setMethods(methods.filter(method => method.id !== id));
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add New Payment Method */}
        <TouchableOpacity style={styles.addButton}>
          <View style={styles.addIcon}>
            <Plus size={24} color="#22C55E" />
          </View>
          <Text style={styles.addText}>Add New Payment Method</Text>
        </TouchableOpacity>

        {/* Payment Methods List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
          <View style={styles.methodsContainer}>
            {methods.map((method) => (
              <View key={method.id} style={styles.methodCard}>
                <View style={styles.methodLeft}>
                  <View style={styles.methodIcon}>
                    <Text style={styles.methodEmoji}>{getCardIcon(method.type)}</Text>
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodName}>{getCardName(method.type)}</Text>
                    {method.type !== 'apple-pay' ? (
                      <Text style={styles.methodDetails}>
                        •••• •••• •••• {method.last4}
                      </Text>
                    ) : (
                      <Text style={styles.methodDetails}>Touch ID / Face ID</Text>
                    )}
                    {method.type !== 'apple-pay' && (
                      <Text style={styles.methodExpiry}>
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.methodRight}>
                  {method.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Check size={12} color="#FFFFFF" />
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreHorizontal size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Payment Options</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionCard}>
              <Text style={styles.optionEmoji}>📱</Text>
              <Text style={styles.optionTitle}>Apple Pay</Text>
              <Text style={styles.optionSubtitle}>Pay with Touch ID</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard}>
              <Text style={styles.optionEmoji}>🤖</Text>
              <Text style={styles.optionTitle}>Google Pay</Text>
              <Text style={styles.optionSubtitle}>Pay with fingerprint</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCard}>
              <Text style={styles.optionEmoji}>💰</Text>
              <Text style={styles.optionTitle}>Cash</Text>
              <Text style={styles.optionSubtitle}>Pay at pickup</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>🔒 Your payment information is secure</Text>
          <Text style={styles.securityText}>
            We use industry-standard encryption to protect your payment details. 
            Your card information is never stored on our servers.
          </Text>
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
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
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
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodEmoji: {
    fontSize: 20,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  methodExpiry: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  methodRight: {
    alignItems: 'flex-end',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  defaultText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  securityInfo: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#166534',
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
});