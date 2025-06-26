import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, RefreshControl } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import ArenaCard from '@/components/ArenaCard';
import SportFilter from '@/components/SportFilter';
import { arenas } from '@/data/mockData';
import { SportType } from '@/types';
import { router } from 'expo-router';

export default function ArenasScreen() {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const filteredArenas = arenas.filter(arena => {
    const matchesSearch = arena.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         arena.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'all' || arena.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleArenaPress = (arenaId: string) => {
    router.push(`/arena/${arenaId}`);
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
      <Header title="Sports Arenas" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search color={colors.textMuted} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search arenas or locations..."
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
            <Text style={styles.resultsTitle}>Available Arenas</Text>
            <Text style={styles.resultsCount}>
              {filteredArenas.length} arena{filteredArenas.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {filteredArenas.length > 0 ? (
            filteredArenas.map(arena => (
              <ArenaCard 
                key={arena.id} 
                arena={arena} 
                onPress={() => handleArenaPress(arena.id)} 
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No arenas found</Text>
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