import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Booking } from '@/types';
import { getSportColor } from '@/data/mockData';

// Mock booking data
const mockBookings: Booking[] = [
  {
    id: '1',
    arenaId: '1',
    arenaName: 'Lahore Cricket Center',
    date: '2024-02-15',
    timeSlot: { id: '1', startTime: '15:00', endTime: '17:00', isAvailable: false, price: 3500 },
    totalPrice: 3500,
    status: 'confirmed',
    sport: 'cricket',
  },
  {
    id: '2',
    arenaId: '2',
    arenaName: 'Champions Football Arena', 
    date: '2024-02-18',
    timeSlot: { id: '2', startTime: '18:00', endTime: '20:00', isAvailable: false, price: 3000 },
    totalPrice: 3000,
    status: 'pending',
    sport: 'football',
  },
];

export default function BookingsScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textMuted;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    authPrompt: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    authTitle: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    authSubtitle: {
      fontSize: 16,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 16,
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.textMuted,
    },
    activeTabText: {
      color: colors.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    bookingCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    bookingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    arenaName: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 12,
    },
    statusText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: '#FFFFFF',
      textTransform: 'capitalize',
    },
    bookingDetails: {
      gap: 8,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 8,
      fontFamily: 'Inter-Regular',
    },
    sportIndicator: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginTop: 8,
    },
    sportText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 18,
      color: colors.textMuted,
      fontFamily: 'Inter-Medium',
      textAlign: 'center',
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
  });

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title="My Bookings" />
        <View style={styles.authPrompt}>
          <Text style={styles.authTitle}>Sign In Required</Text>
          <Text style={styles.authSubtitle}>
            Please sign in to view your bookings and manage your reservations.
          </Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="My Bookings" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {mockBookings.length > 0 ? (
          mockBookings.map(booking => {
            const sportColor = getSportColor(booking.sport);
            return (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.arenaName}>{booking.arenaName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                
                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Calendar color={colors.primary} size={16} />
                    <Text style={styles.detailText}>
                      {new Date(booking.date).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Clock color={colors.primary} size={16} />
                    <Text style={styles.detailText}>
                      {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                    </Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <CreditCard color={colors.primary} size={16} />
                    <Text style={styles.detailText}>
                      Rs. {booking.totalPrice.toLocaleString()}
                    </Text>
                  </View>
                </View>
                
                <View style={[styles.sportIndicator, { backgroundColor: sportColor }]}>
                  <Text style={styles.sportText}>{booking.sport}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              {activeTab === 'upcoming' 
                ? 'Book an arena to see your upcoming reservations'
                : 'Your past bookings will appear here'
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}