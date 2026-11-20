
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  Pressable,
  View,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import { styles } from '../../src/components/ui';
import { lessons, subjects } from '../../src/data/lessons';
import { getLanguage } from '../../src/lib/storage';
import { subjectStyles } from '../styles/subject.styles';

export default function SubjectPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [lang, setLang] = useState<'en' | 'sw'>('en');

  useEffect(() => {
    getLanguage().then(setLang);
  }, []);

  const subject = subjects.find((item) => item.id === id);
  const items = lessons.filter((item) => item.subject === id);
  const isEnglish = lang === 'en';

  if (!subject) {
    return (
      <View style={[styles.screen, subjectStyles.content]}>
        <Pressable onPress={() => router.back()}>
          <Text style={subjectStyles.backText}>
            ← {isEnglish ? 'Back' : 'Rudi'}
          </Text>
        </Pressable>

        <Text style={subjectStyles.emptyText}>
          {isEnglish ? 'Subject not found.' : 'Somo halijapatikana.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={subjectStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        onPress={() => router.back()}
        style={subjectStyles.backButton}
        accessibilityRole="button"
      >
        <Text style={subjectStyles.backText}>
          ← {isEnglish ? 'Back to learning' : 'Rudi kwenye masomo'}
        </Text>
      </Pressable>

      <View
        style={[
          subjectStyles.hero,
          { backgroundColor: subject.colour },
        ]}
      >
        <View style={subjectStyles.heroTop}>
          <View style={subjectStyles.emojiCircle}>
            <Text style={subjectStyles.heroEmoji}>
              {subject.emoji}
            </Text>
          </View>

          <View style={subjectStyles.countBadge}>
            <Text style={subjectStyles.countNumber}>
              {items.length}
            </Text>
            <Text style={subjectStyles.countLabel}>
              {isEnglish ? 'LESSONS' : 'MASOMO'}
            </Text>
          </View>
        </View>

        <Text style={subjectStyles.heroTitle}>
          {subject.title[lang]}
        </Text>

        <Text style={subjectStyles.heroSubtitle}>
          {subject.subtitle[lang]}
        </Text>

        <Text style={subjectStyles.heroFooter}>
          {isEnglish
            ? '✨ Every lesson is a new adventure!'
            : '✨ Kila somo ni safari mpya!'}
        </Text>
      </View>

      <View style={subjectStyles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={subjectStyles.sectionTitle}>
            {isEnglish ? 'Choose a lesson' : 'Chagua somo'}
          </Text>

          <Text style={subjectStyles.sectionSubtitle}>
            {isEnglish
              ? 'Learn something wonderful today'
              : 'Jifunze jambo jipya leo'}
          </Text>
        </View>

        <Text style={{ fontSize: 27 }}>📚</Text>
      </View>

      {items.length === 0 ? (
        <View style={subjectStyles.emptyCard}>
          <Text style={{ fontSize: 42 }}>🚀</Text>

          <Text style={subjectStyles.emptyTitle}>
            {isEnglish ? 'Coming soon!' : 'Yanakuja hivi karibuni!'}
          </Text>

          <Text style={subjectStyles.emptyText}>
            {isEnglish
              ? 'More exciting activities are on their way.'
              : 'Shughuli nyingine za kufurahisha zinakuja.'}
          </Text>
        </View>
      ) : (
        <View style={subjectStyles.lessonList}>
          {items.map((lesson, index) => (
            <Pressable
              key={lesson.id}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
              accessibilityRole="button"
              accessibilityLabel={lesson.title[lang]}
              style={({ pressed }) => [
                subjectStyles.lessonCard,
                pressed && subjectStyles.pressed,
              ]}
            >
              <View style={subjectStyles.lessonNumber}>
                <Text style={subjectStyles.lessonNumberText}>
                  {index + 1}
                </Text>
              </View>

              <View style={subjectStyles.lessonEmoji}>
                <Text style={{ fontSize: 29 }}>
                  {lesson.emoji}
                </Text>
              </View>

              <View style={subjectStyles.lessonInfo}>
                <Text style={subjectStyles.lessonTitle}>
                  {lesson.title[lang]}
                </Text>

                <Text style={subjectStyles.lessonDescription}>
                  {lesson.description[lang]}
                </Text>

                <View style={subjectStyles.ageBadge}>
                  <Text style={subjectStyles.ageText}>
                    {isEnglish ? 'AGES' : 'UMRI'}: {lesson.age.join(', ')}
                  </Text>
                </View>
              </View>

              <View style={subjectStyles.arrowCircle}>
                <Text style={subjectStyles.arrowText}>›</Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <View style={subjectStyles.footer}>
        <Text style={subjectStyles.footerText}>
          🌟 {isEnglish
            ? 'You are doing great. Keep learning!'
            : 'Unafanya vizuri. Endelea kujifunza!'}
        </Text>
      </View>
    </ScrollView>
  );
}
