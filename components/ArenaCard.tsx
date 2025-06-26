import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Arena } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { getSportColor } from '@/data/mockData';

interface ArenaCardProps {
  arena: Arena;
  onPress: () => void;
}

export default function ArenaCard({ arena, onPress }: ArenaCardProps) {
  const { colors } = useTheme();
  const sportColor = getSportColor(arena.sport);

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
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    sportIndicator: {
      position: 'absolute',
      top: 12,
      left: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: sportColor,
    },
    sportText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
    content: {
      padding: 16,
    },
    name: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    location: {
      fontSize: 14,
      color: colors.textMuted,
      marginLeft: 4,
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
      fontSize: 14,
      color: colors.text,
      marginLeft: 4,
      fontFamily: 'Inter-Medium',
    },
    price: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.primary,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={{ uri: arena.imageUrl }} style={styles.image} />
        <View style={[styles.sportIndicator, { backgroundColor: sportColor }]}>
          <Text style={styles.sportText}>{arena.sport}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{arena.name}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin color={colors.textMuted} size={16} />
          <Text style={styles.location}>{arena.location}</Text>
        </View>
        
        <View style={styles.ratingPriceContainer}>
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={16} fill="#FFD700" />
            <Text style={styles.rating}>{arena.rating}</Text>
          </View>
          <Text style={styles.price}>Rs. {arena.price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}