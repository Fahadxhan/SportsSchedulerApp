import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Star, Award, Clock } from 'lucide-react-native';
import { Coach } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { getSportColor } from '@/data/mockData';

interface CoachCardProps {
  coach: Coach;
  onPress: () => void;
}

export default function CoachCard({ coach, onPress }: CoachCardProps) {
  const { colors } = useTheme();
  const sportColor = getSportColor(coach.sport);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    header: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      resizeMode: 'cover',
    },
    headerContent: {
      flex: 1,
      marginLeft: 16,
    },
    name: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    sportIndicator: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: sportColor,
      marginBottom: 8,
    },
    sportText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 4,
      fontFamily: 'Inter-Medium',
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    description: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 12,
      fontFamily: 'Inter-Regular',
      lineHeight: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    statText: {
      fontSize: 12,
      color: colors.text,
      marginLeft: 4,
      fontFamily: 'Inter-Medium',
    },
    priceContainer: {
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    priceLabel: {
      fontSize: 12,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    price: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
      marginTop: 2,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: coach.imageUrl }} style={styles.image} />
        
        <View style={styles.headerContent}>
          <Text style={styles.name}>{coach.name}</Text>
          <View style={[styles.sportIndicator, { backgroundColor: sportColor }]}>
            <Text style={styles.sportText}>{coach.sport}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={16} fill="#FFD700" />
            <Text style={styles.rating}>{coach.rating}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{coach.description}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Clock color={colors.primary} size={16} />
            <Text style={styles.statText}>{coach.experience} years</Text>
          </View>
          <View style={styles.statItem}>
            <Award color={colors.success} size={16} />
            <Text style={styles.statText}>{coach.certifications.length} certs</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Per Session</Text>
          <Text style={styles.price}>Rs. {coach.price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}