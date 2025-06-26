import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Users, UserCheck, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import ArenaCard from '@/components/ArenaCard';
import TeamCard from '@/components/TeamCard';
import CoachCard from '@/components/CoachCard';
import SportFilter from '@/components/SportFilter';
import { arenas, teams, coaches } from '@/data/mockData';
import { SportType } from '@/types';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const handleArenaPress = (arenaId: string) => {
    router.push(`/arena/${arenaId}`);
  };

  const handleTeamPress = (teamId: string) => {
    // For now, just log - we can add team detail screen later
    console.log('Navigate to team:', teamId);
  };

  const handleCoachPress = (coachId: string) => {
    // For now, just log - we can add coach detail screen later
    console.log('Navigate to coach:', coachId);
  };

  const filteredArenas = selectedSport === 'all' 
    ? arenas.slice(0, 3) 
    : arenas.filter(arena => arena.sport === selectedSport).slice(0, 3);

  const filteredTeams = selectedSport === 'all' 
    ? teams.slice(0, 2) 
    : teams.filter(team => team.sport === selectedSport).slice(0, 2);

  const filteredCoaches = selectedSport === 'all' 
    ? coaches.slice(0, 2) 
    : coaches.filter(coach => coach.sport === selectedSport).slice(0, 2);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    heroSection: {
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    heroImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    heroOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    heroContent: {
      alignItems: 'center',
      zIndex: 1,
    },
    heroTitle: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 12,
      lineHeight: 34,
    },
    heroSubtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 24,
      opacity: 0.9,
      lineHeight: 22,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
    },
    primaryButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#FFFFFF',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: '#FFFFFF',
    },
    content: {
      padding: 20,
    },
    welcomeSection: {
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    welcomeSubtext: {
      fontSize: 16,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      marginRight: 4,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
  });

  if (!user) {
    return (
      <View style={styles.container}>
        <Header showMenu />
        <ScrollView 
          style={styles.scrollContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
              style={styles.heroImage}
            />
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                Schedule and Book Indoor Sports Arenas in Lahore
              </Text>
              <Text style={styles.heroSubtitle}>
                Connect with the best indoor sports facilities for cricket, football, and tennis. Book arenas, join teams, and find coaches all in one platform.
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => router.push('/(tabs)/arenas')}
                >
                  <Text style={styles.buttonText}>Find Arenas</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={() => router.push('/auth/vendor-register')}
                >
                  <Text style={styles.buttonText}>Register as Vendor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <SportFilter selectedSport={selectedSport} onSportSelect={setSelectedSport} />

          <View style={styles.content}>
            {/* Featured Arenas */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Arenas</Text>
                <TouchableOpacity 
                  style={styles.seeAllButton}
                  onPress={() => router.push('/(tabs)/arenas')}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <ArrowRight color={colors.primary} size={16} />
                </TouchableOpacity>
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
                  <Text style={styles.emptyText}>No arenas found for {selectedSport}</Text>
                </View>
              )}
            </View>

            {/* Featured Teams */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Active Teams</Text>
                <TouchableOpacity 
                  style={styles.seeAllButton}
                  onPress={() => router.push('/(tabs)/teams')}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <ArrowRight color={colors.primary} size={16} />
                </TouchableOpacity>
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
                  <Text style={styles.emptyText}>No teams found for {selectedSport}</Text>
                </View>
              )}
            </View>

            {/* Featured Coaches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Coaches</Text>
                <TouchableOpacity 
                  style={styles.seeAllButton}
                  onPress={() => router.push('/(tabs)/coaching')}
                >
                  <Text style={styles.seeAllText}>See All</Text>
                  <ArrowRight color={colors.primary} size={16} />
                </TouchableOpacity>
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
                  <Text style={styles.emptyText}>No coaches found for {selectedSport}</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showMenu />
      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
            <Text style={styles.welcomeSubtext}>Ready to schedule some sports?</Text>
          </View>

          <SportFilter selectedSport={selectedSport} onSportSelect={setSelectedSport} />

          {/* Featured Arenas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Arenas</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => router.push('/(tabs)/arenas')}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight color={colors.primary} size={16} />
              </TouchableOpacity>
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
                <Text style={styles.emptyText}>No arenas found for {selectedSport}</Text>
              </View>
            )}
          </View>

          {/* Featured Teams */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Teams</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => router.push('/(tabs)/teams')}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight color={colors.primary} size={16} />
              </TouchableOpacity>
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
                <Text style={styles.emptyText}>No teams found for {selectedSport}</Text>
              </View>
            )}
          </View>

          {/* Featured Coaches */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Coaches</Text>
              <TouchableOpacity 
                style={styles.seeAllButton}
                onPress={() => router.push('/(tabs)/coaching')}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight color={colors.primary} size={16} />
              </TouchableOpacity>
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
                <Text style={styles.emptyText}>No coaches found for {selectedSport}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}