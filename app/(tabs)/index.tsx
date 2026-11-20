
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useFocusEffect, router } from 'expo-router';

import { Card, C, SectionTitle, styles } from '../../src/components/ui';
import { subjects, lessons } from '../../src/data/lessons';
import {
  getChildName,
  getLanguage,
  getProgress,
} from '../../src/lib/storage';
import { strings } from '../../src/i18n/strings';
import { homeStyles } from '../styles/home.styles';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [name, setName] = useState('Superstar');
  const [done, setDone] = useState(0);
  const [stars, setStars] = useState(0);

  const t = strings[lang];

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const load = async () => {
        const [language, childName, progress] = await Promise.all([
          getLanguage(),
          getChildName(),
          getProgress(),
        ]);

        if (active) {
          setLang(language);
          setName(childName);
          setDone(progress.length);
          setStars(
            progress.reduce(
              (sum, row) =>
                sum + Math.round((row.score / Math.max(1, row.total)) * 3),
              0
            )
          );
        }
      };

      load();

      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={homeStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={homeStyles.hero}>
        <View style={homeStyles.heroTop}>
          <View>
            <Text style={homeStyles.brand}>🌈 LITTLE LEARNERS</Text>
            <Text style={homeStyles.tagline}>LEARN • PLAY • GROW</Text>
          </View>

          <View style={homeStyles.mascot}>
            <Text style={{ fontSize: 30 }}>🦁</Text>
          </View>
        </View>

        <Text style={homeStyles.greeting}>
          {t.hello}, {name}!
        </Text>

        <Text style={homeStyles.greetingStar}>⭐</Text>

        <Text style={homeStyles.subtitle}>{t.choose}</Text>

        <View style={homeStyles.statsRow}>
          <View style={homeStyles.statCard}>
            <View style={homeStyles.statIcon}>
              <Text style={{ fontSize: 25 }}>🏅</Text>
            </View>
            <Text style={homeStyles.statNumber}>{done}</Text>
            <Text style={homeStyles.statLabel}>{t.completed}</Text>
          </View>

          <View style={homeStyles.statCard}>
            <View style={homeStyles.statIcon}>
              <Text style={{ fontSize: 25 }}>⭐</Text>
            </View>
            <Text style={homeStyles.statNumber}>{stars}</Text>
            <Text style={homeStyles.statLabel}>{t.stars}</Text>
          </View>
        </View>
      </View>

      <View style={homeStyles.sectionHeader}>
        <SectionTitle>{t.subjects}</SectionTitle>
        <Text style={homeStyles.sectionEmoji}>🚀</Text>
      </View>

      <View style={homeStyles.subjectGrid}>
        {subjects.map((subject) => (
          <Pressable
            key={subject.id}
            onPress={() => router.push(`/subject/${subject.id}`)}
            accessibilityRole="button"
            accessibilityLabel={subject.title[lang]}
            style={({ pressed }) => [
              homeStyles.subjectCard,
              { backgroundColor: subject.colour },
              pressed && homeStyles.pressed,
            ]}
          >
            <View style={homeStyles.subjectIcon}>
              <Text style={{ fontSize: 35 }}>{subject.emoji}</Text>
            </View>

            <Text style={homeStyles.subjectTitle}>
              {subject.title[lang]}
            </Text>

            <Text style={homeStyles.subjectSubtitle}>
              {subject.subtitle[lang]}
            </Text>

            <View style={homeStyles.subjectArrow}>
              <Text style={{ fontSize: 18, color: C.ink }}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={homeStyles.tipCard}>
        <View style={homeStyles.tipIcon}>
          <Text style={{ fontSize: 25 }}>💡</Text>
        </View>
        <Text style={homeStyles.tipText}>{t.dailyTip}</Text>
      </View>

      <Card style={homeStyles.offlineCard}>
        <View style={homeStyles.offlineIcon}>
          <Text style={{ fontSize: 27 }}>📴</Text>
        </View>

        <View style={{ flex: 1, gap: 4 }}>
          <Text style={homeStyles.offlineTitle}>{t.offline}</Text>
          <Text style={styles.body}>{t.offlineDesc}</Text>
        </View>

        <Text style={{ fontSize: 20 }}>✓</Text>
      </Card>

      <Text style={homeStyles.footer}>
        {lessons.length} starter lessons • English / Kiswahili
      </Text>
    </ScrollView>
  );
}
