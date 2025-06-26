import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MessageCircle, Phone, Mail, Send, ChevronDown, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I book an arena?',
    answer: 'To book an arena, browse the available arenas, select your preferred time slot, and complete the booking process. You\'ll need to sign in to make a booking.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel your booking up to 24 hours before the scheduled time. Cancellations made within 24 hours may incur a fee.'
  },
  {
    question: 'How do I join a team?',
    answer: 'Browse the teams section, find a team that matches your sport and skill level, and contact the team captain to request to join.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept cash payments at the venue, mobile banking, and major credit/debit cards for online bookings.'
  },
  {
    question: 'How do I become a coach on the platform?',
    answer: 'Contact our support team with your coaching credentials and experience. We\'ll review your application and get back to you within 3-5 business days.'
  }
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleFAQToggle = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleSubmitContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    Alert.alert('Success', 'Your message has been sent! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', message: '' });
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
    },
    section: {
      backgroundColor: colors.card,
      marginTop: 20,
      paddingVertical: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    contactOptions: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    contactOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 8,
      marginBottom: 12,
    },
    contactText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 12,
      fontFamily: 'Inter-Medium',
    },
    faqItem: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    faqQuestion: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      justifyContent: 'space-between',
    },
    faqQuestionText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      flex: 1,
      marginRight: 12,
    },
    faqAnswer: {
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    faqAnswerText: {
      fontSize: 14,
      color: colors.textMuted,
      fontFamily: 'Inter-Regular',
      lineHeight: 20,
    },
    contactForm: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: colors.text,
      fontFamily: 'Inter-Regular',
      borderWidth: 1,
      borderColor: colors.border,
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 8,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption}>
              <Phone color={colors.primary} size={20} />
              <Text style={styles.contactText}>+92-300-1234567</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactOption}>
              <Mail color={colors.primary} size={20} />
              <Text style={styles.contactText}>support@lahoresports.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactOption}>
              <MessageCircle color={colors.primary} size={20} />
              <Text style={styles.contactText}>Live Chat (9 AM - 6 PM)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqQuestion}
                onPress={() => handleFAQToggle(index)}
              >
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                {expandedFAQ === index ? (
                  <ChevronDown color={colors.text} size={20} />
                ) : (
                  <ChevronRight color={colors.text} size={20} />
                )}
              </TouchableOpacity>
              {expandedFAQ === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <View style={styles.contactForm}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={contactForm.name}
                onChangeText={(text) => setContactForm(prev => ({ ...prev, name: text }))}
                placeholder="Enter your name"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={contactForm.email}
                onChangeText={(text) => setContactForm(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={contactForm.message}
                onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
                placeholder="Describe your issue or question..."
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
              />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitContact}>
              <Send color="#FFFFFF" size={16} />
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}