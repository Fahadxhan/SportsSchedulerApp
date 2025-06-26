import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, RefreshControl } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import CoachCard from '@/components/CoachCard';
import SportFilter from '@/components/SportFilter';
import { coaches } from '@/data/mockData';
import { SportType } from '@/types';

export default function CoachingScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'all' || coach.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleCoachPress = (coachId: string) => {
    console.log('Navigate to coach:', coachId);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      marginLeft: 12,
    },
    resultsContainer: {
      padding: 20,
      flex: 1,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    resultsTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    resultsCount: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
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

  return (
    <View style={styles.container}>
      <Header title="Find Coaches" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={colors.textMuted} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search coaches..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <SportFilter selectedSport={selectedSport} onSportSelect={setSelectedSport} />

      <ScrollView 
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Available Coaches</Text>
            <Text style={styles.resultsCount}>
              {filteredCoaches.length} coach{filteredCoaches.length !== 1 ? 'es' : ''}
            </Text>
          </View>

          {filteredCoaches.length > 0 ? (
            filteredCoaches.map(coach => (
              <CoachCard 
                key={coach.id} 
                coach={coach} 
                onPress={() => handleCoachPress(coach.id)} 
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No coaches found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or sport filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}