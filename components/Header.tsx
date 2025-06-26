import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Menu } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  title?: string;
  showThemeToggle?: boolean;
  showMenu?: boolean;
  onMenuPress?: () => void;
}

export default function Header({ 
  title, 
  showThemeToggle = true, 
  showMenu = false, 
  onMenuPress 
}: HeaderProps) {
  const { colors, isDark, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginLeft: showMenu ? 16 : 0,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.backgroundSecondary,
    },
    menuButton: {
      padding: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showMenu && (
            <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
              <Menu color={colors.text} size={24} />
            </TouchableOpacity>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        
        <View style={styles.rightSection}>
          {showThemeToggle && (
            <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
              {isDark ? (
                <Sun color={colors.primary} size={20} />
              ) : (
                <Moon color={colors.primary} size={20} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}