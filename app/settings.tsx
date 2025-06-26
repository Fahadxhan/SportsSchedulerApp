import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Moon, Sun, Bell, Shield, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

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
    },
    section: {
      backgroundColor: colors.card,
      marginTop: 20,
      paddingVertical: 8,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.textMuted,
      paddingHorizontal: 20,
      paddingVertical: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingItemLast: {
      borderBottomWidth: 0,
    },
    settingIcon: {
      marginRight: 16,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    settingAction: {
      marginLeft: 12,
    },
    version: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      padding: 20,
    },
  });

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
            <View style={styles.settingIcon}>
              {isDark ? (
                <Sun color={colors.text} size={20} />
              ) : (
                <Moon color={colors.text} size={20} />
              )}
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Theme</Text>
              <Text style={styles.settingDescription}>
                {isDark ? 'Dark mode' : 'Light mode'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Bell color={colors.text} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive booking confirmations and updates
              </Text>
            </View>
            <View style={styles.settingAction}>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notifications ? '#FFFFFF' : colors.textMuted}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Shield color={colors.text} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingDescription}>
                Help find nearby arenas and facilities
              </Text>
            </View>
            <View style={styles.settingAction}>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={locationServices ? '#FFFFFF' : colors.textMuted}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleNavigation('/help')}
          >
            <View style={styles.settingIcon}>
              <HelpCircle color={colors.text} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Help & Support</Text>
              <Text style={styles.settingDescription}>
                Get help with your account and bookings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.settingItem, styles.settingItemLast]}
            onPress={() => handleNavigation('/about')}
          >
            <View style={styles.settingIcon}>
              <Info color={colors.text} size={20} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>About</Text>
              <Text style={styles.settingDescription}>
                App information and terms
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>
          LahoreSportsConnect v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}