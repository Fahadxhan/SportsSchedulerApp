import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, User, Settings, CircleHelp as HelpCircle, LogOut, UserPlus, LogIn } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route);
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    router.replace('/(tabs)');
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
    },
    drawer: {
      backgroundColor: colors.card,
      width: '80%',
      height: '100%',
      paddingTop: 0,
    },
    header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
    },
    closeButton: {
      padding: 4,
    },
    content: {
      flex: 1,
      paddingTop: 20,
    },
    userSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    userName: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
    },
    userRole: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
      marginTop: 4,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 16,
      fontFamily: 'Inter-Medium',
    },
    logoutItem: {
      borderBottomWidth: 0,
      marginTop: 20,
    },
    logoutText: {
      color: colors.error,
    },
    authSection: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    authTitle: {
      fontSize: 16,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 12,
    },
    authSubtitle: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      marginBottom: 16,
      lineHeight: 20,
    },
    authButtons: {
      gap: 12,
    },
    authButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
    },
    authButtonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    authButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    authButtonTextSecondary: {
      color: colors.primary,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>LahoreSportsConnect</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <X color="#FFFFFF" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
              {user ? (
                <>
                  <View style={styles.userSection}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => handleNavigation('/profile')}
                  >
                    <User color={colors.text} size={20} />
                    <Text style={styles.menuItemText}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => handleNavigation('/settings')}
                  >
                    <Settings color={colors.text} size={20} />
                    <Text style={styles.menuItemText}>Settings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => handleNavigation('/help')}
                  >
                    <HelpCircle color={colors.text} size={20} />
                    <Text style={styles.menuItemText}>Help & Support</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.menuItem, styles.logoutItem]}
                    onPress={handleLogout}
                  >
                    <LogOut color={colors.error} size={20} />
                    <Text style={[styles.menuItemText, styles.logoutText]}>Sign Out</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <View style={styles.authSection}>
                    <Text style={styles.authTitle}>Welcome!</Text>
                    <Text style={styles.authSubtitle}>
                      Sign in to book arenas, join teams, and connect with coaches in Lahore.
                    </Text>
                    <View style={styles.authButtons}>
                      <TouchableOpacity 
                        style={styles.authButton}
                        onPress={() => handleNavigation('/auth/login')}
                      >
                        <LogIn color="#FFFFFF" size={16} />
                        <Text style={styles.authButtonText}>Sign In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.authButton, styles.authButtonSecondary]}
                        onPress={() => handleNavigation('/auth/register')}
                      >
                        <UserPlus color={colors.primary} size={16} />
                        <Text style={[styles.authButtonText, styles.authButtonTextSecondary]}>
                          Sign Up
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => handleNavigation('/help')}
                  >
                    <HelpCircle color={colors.text} size={20} />
                    <Text style={styles.menuItemText}>Help & Support</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}