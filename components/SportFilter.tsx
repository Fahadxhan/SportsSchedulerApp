import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SportType } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { getSportColor } from '@/data/mockData';

interface SportFilterProps {
  selectedSport: SportType | 'all';
  onSportSelect: (sport: SportType | 'all') => void;
}

const sports: (SportType | 'all')[] = ['all', 'cricket', 'football', 'tennis'];

export default function SportFilter({ selectedSport, onSportSelect }: SportFilterProps) {
  const { colors } = useTheme();

  const getFilterStyle = (sport: SportType | 'all') => {
    const isSelected = selectedSport === sport;
    const sportColor = sport === 'all' ? colors.primary : getSportColor(sport);
    
    return StyleSheet.create({
      filter: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 12,
        borderWidth: 2,
        borderColor: isSelected ? sportColor : colors.border,
        backgroundColor: isSelected ? sportColor : colors.card,
      },
      text: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: isSelected ? '#FFFFFF' : colors.text,
        textTransform: 'capitalize',
      },
    });
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 12,
    },
    scrollContainer: {
      paddingHorizontal: 20,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {sports.map((sport) => {
          const filterStyles = getFilterStyle(sport);
          return (
            <TouchableOpacity
              key={sport}
              style={filterStyles.filter}
              onPress={() => onSportSelect(sport)}
            >
              <Text style={filterStyles.text}>
                {sport === 'all' ? 'All Sports' : sport}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}