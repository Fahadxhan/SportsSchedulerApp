import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Users, Trophy, Target } from 'lucide-react-native';
import { Team } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { getSportColor } from '@/data/mockData';

interface TeamCardProps {
  team: Team;
  onPress: () => void;
}

export default function TeamCard({ team, onPress }: TeamCardProps) {
  const { colors } = useTheme();
  const sportColor = getSportColor(team.sport);

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
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 160,
      resizeMode: 'cover',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 16,
    },
    name: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    captain: {
      fontSize: 14,
      color: '#FFFFFF',
      opacity: 0.9,
      fontFamily: 'Inter-Regular',
    },
    sportIndicator: {
      position: 'absolute',
      top: 12,
      right: 12,
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
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Image source={{ uri: team.imageUrl }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.name}>{team.name}</Text>
          <Text style={styles.captain}>Captain: {team.captain}</Text>
        </View>
        <View style={[styles.sportIndicator, { backgroundColor: sportColor }]}>
          <Text style={styles.sportText}>{team.sport}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{team.description}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users color={colors.primary} size={16} />
            <Text style={styles.statText}>{team.members}/{team.maxMembers}</Text>
          </View>
          <View style={styles.statItem}>
            <Trophy color={colors.success} size={16} />
            <Text style={styles.statText}>{team.wins} Wins</Text>
          </View>
          <View style={styles.statItem}>
            <Target color={colors.error} size={16} />
            <Text style={styles.statText}>{team.losses} Losses</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}