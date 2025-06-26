import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Users, Target, ExternalLink } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function AboutScreen() {
  const { colors } = useTheme();

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    content: {
      flex: 1,
      padding: 20,
    },
    logoSection: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    logoText: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
    },
    appName: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    version: {
      fontSize: 16,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 12,
    },
    sectionText: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      lineHeight: 24,
      marginBottom: 16,
    },
    featureList: {
      gap: 12,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    featureIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    featureText: {
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      flex: 1,
      lineHeight: 22,
    },
    linkSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
    },
    linkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    linkItemLast: {
      borderBottomWidth: 0,
    },
    linkText: {
      fontSize: 16,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      flex: 1,
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    footerText: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>SS</Text>
          </View>
          <Text style={styles.appName}>Sports Scheduler</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            Sports Scheduler is your premier platform for discovering and booking indoor sports facilities in Lahore. 
            We connect sports enthusiasts with the best arenas, teams, and coaches in the city.
          </Text>
          <Text style={styles.sectionText}>
            Our mission is to make sports more accessible and help build a stronger sports community in Lahore by 
            providing a seamless platform for scheduling facilities, joining teams, and finding professional coaching.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MapPin color={colors.primary} size={20} style={styles.featureIcon} />
              <Text style={styles.featureText}>
                Discover and schedule premium indoor sports arenas across Lahore
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Users color={colors.primary} size={20} style={styles.featureIcon} />
              <Text style={styles.featureText}>
                Join active sports teams and connect with fellow players
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Target color={colors.primary} size={20} style={styles.featureIcon} />
              <Text style={styles.featureText}>
                Find certified coaches to improve your skills and technique
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.linkSection}>
          <Text style={styles.sectionTitle}>Links</Text>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => handleLinkPress('https://example.com/privacy')}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
            <ExternalLink color={colors.primary} size={16} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.linkItem}
            onPress={() => handleLinkPress('https://example.com/terms')}
          >
            <Text style={styles.linkText}>Terms of Service</Text>
            <ExternalLink color={colors.primary} size={16} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.linkItem, styles.linkItemLast]}
            onPress={() => handleLinkPress('https://example.com/support')}
          >
            <Text style={styles.linkText}>Support Center</Text>
            <ExternalLink color={colors.primary} size={16} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Sports Scheduler{'\n'}
            Made with ❤️ for the sports community in Lahore
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}