import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import TeamCard from '@/components/TeamCard';
import SportFilter from '@/components/SportFilter';
import { teams } from '@/data/mockData';
import { SportType } from '@/types';

export default function TeamsScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.captain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'all' || team.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const handleTeamPress = (teamId: string) => {
    console.log('Navigate to team:', teamId);
  };

  const handleCreateTeam = () => {
    if (!user) {
      // Navigate to login
      return;
    }
    console.log('Create new team');
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
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    searchInputContainer: {
      flex: 1,
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
    createButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    createButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
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
      <Header title="Sports Teams" />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Search color={colors.textMuted} size={20} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search teams or captains..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {user && (
            <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
              <Plus color="#FFFFFF" size={16} />
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SportFilter selectedSport={selectedSport} onSportSelect={setSelectedSport} />

      <ScrollView 
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Active Teams</Text>
            <Text style={styles.resultsCount}>
              {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {filteredTeams.length > 0 ? (
            filteredTeams.map(team => (
              <TeamCard 
                key={team.id} 
                team={team} 
                onPress={() => handleTeamPress(team.id)} 
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No teams found</Text>
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