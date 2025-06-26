import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { MapPin, Star, Clock, Calendar, ArrowLeft, Phone, Mail } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { arenas } from '@/data/mockData';
import { getSportColor } from '@/data/mockData';

export default function ArenaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const arena = arenas.find(a => a.id === id);

  if (!arena) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Arena not found</Text>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const sportColor = getSportColor(arena.sport);

  const handleBooking = () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to book an arena.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => router.push('/auth/login') }
      ]);
      return;
    }

    if (!selectedTimeSlot) {
      Alert.alert('Select Time Slot', 'Please select a time slot to book.');
      return;
    }

    Alert.alert('Booking Confirmed', 'Your arena booking has been confirmed!');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      marginBottom: 20,
    },
    backButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    backButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginLeft: 16,
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    heroImage: {
      width: '100%',
      height: 250,
      resizeMode: 'cover',
    },
    sportIndicator: {
      position: 'absolute',
      top: 16,
      right: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: sportColor,
    },
    sportText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
    content: {
      padding: 20,
    },
    titleSection: {
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    location: {
      fontSize: 16,
      color: colors.textMuted,
      marginLeft: 8,
      fontFamily: 'Inter-Regular',
    },
    ratingPriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 8,
      fontFamily: 'Inter-Medium',
    },
    price: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 12,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      fontFamily: 'Inter-Regular',
    },
    facilitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    facilityTag: {
      backgroundColor: colors.backgroundSecondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    facilityText: {
      fontSize: 14,
      color: colors.text,
      fontFamily: 'Inter-Medium',
    },
    timeSlotContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    timeSlot: {
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 16,
      minWidth: 120,
      alignItems: 'center',
    },
    timeSlotSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '10',
    },
    timeSlotUnavailable: {
      opacity: 0.5,
      backgroundColor: colors.backgroundSecondary,
    },
    timeSlotTime: {
      fontSize: 14,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    timeSlotPrice: {
      fontSize: 12,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    bookingSection: {
      backgroundColor: colors.card,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    bookButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 12,
    },
    bookButtonDisabled: {
      opacity: 0.6,
    },
    bookButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    contactInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 24,
    },
    contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    contactText: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{arena.name}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: arena.imageUrl }} style={styles.heroImage} />
          <View style={[styles.sportIndicator, { backgroundColor: sportColor }]}>
            <Text style={styles.sportText}>{arena.sport}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{arena.name}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin color={colors.textMuted} size={20} />
              <Text style={styles.location}>{arena.location}</Text>
            </View>
            
            <View style={styles.ratingPriceContainer}>
              <View style={styles.ratingContainer}>
                <Star color="#FFD700" size={20} fill="#FFD700" />
                <Text style={styles.rating}>{arena.rating}</Text>
              </View>
              <Text style={styles.price}>From Rs. {arena.price.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{arena.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesContainer}>
              {arena.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityTag}>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <View style={styles.timeSlotContainer}>
              {arena.availability.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[
                    styles.timeSlot,
                    selectedTimeSlot === slot.id && styles.timeSlotSelected,
                    !slot.isAvailable && styles.timeSlotUnavailable,
                  ]}
                  onPress={() => slot.isAvailable && setSelectedTimeSlot(slot.id)}
                  disabled={!slot.isAvailable}
                >
                  <Text style={styles.timeSlotTime}>
                    {slot.startTime} - {slot.endTime}
                  </Text>
                  <Text style={styles.timeSlotPrice}>
                    Rs. {slot.price.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bookingSection}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedTimeSlot || !user) && styles.bookButtonDisabled,
          ]}
          onPress={handleBooking}
          disabled={!selectedTimeSlot && !user}
        >
          <Text style={styles.bookButtonText}>
            {!user ? 'Sign In to Book' : selectedTimeSlot ? 'Book Now' : 'Select Time Slot'}
          </Text>
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <TouchableOpacity style={styles.contactButton}>
            <Phone color={colors.primary} size={16} />
            <Text style={styles.contactText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton}>
            <Mail color={colors.primary} size={16} />
            <Text style={styles.contactText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}