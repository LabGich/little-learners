
import React, { useState, useCallback } from 'react';
import { ScrollView, Text, Pressable, View } from 'react-native';
import { useFocusEffect, router } from 'expo-router';

import { Card, C, SectionTitle, styles } from '../../src/components/ui';
import { subjects, lessons } from '../../src/data/lessons';
import { getLanguage } from '../../src/lib/storage';
import { learnStyles } from '../styles/learn.styles';

export default function Learn() {
  const [lang, setLang] = useState<'en' | 'sw'>('en');

  useFocusEffect(
    useCallback(() => {
      let active = true;

      getLanguage().then((language) => {
        if (active) setLang(language);
      });

      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={learnStyles.content}
    >
      <Text style={styles.title}>
        {lang === 'en' ? 'Choose an adventure' : 'Chagua safari'}
      </Text>

      <Text style={styles.body}>
        {lang === 'en'
          ? 'Pick a subject and explore at your own pace.'
          : 'Chagua somo na ujifunze kwa kasi yako.'}
      </Text>

      {subjects.map((subject) => (
        <Pressable
          key={subject.id}
          onPress={() => router.push(`/subject/${subject.id}`)}
        >
          <Card
            style={[
              learnStyles.subjectRow,
              { backgroundColor: subject.colour },
            ]}
          >
            <Text style={learnStyles.subjectEmoji}>{subject.emoji}</Text>

            <View style={learnStyles.subjectDetails}>
              <Text style={[learnStyles.subjectTitle, { color: C.ink }]}>
                {subject.title[lang]}
              </Text>

              <Text style={styles.body}>
                {subject.subtitle[lang]}
              </Text>
            </View>

            <Text style={learnStyles.arrow}>›</Text>
          </Card>
        </Pressable>
      ))}

      <SectionTitle>
        {lang === 'en'
          ? 'All starter lessons'
          : 'Masomo yote ya mwanzo'}
      </SectionTitle>

      {lessons.map((lesson) => (
        <Pressable
          key={lesson.id}
          onPress={() => router.push(`/lesson/${lesson.id}`)}
        >
          <Card style={learnStyles.lessonRow}>
            <Text style={learnStyles.lessonEmoji}>{lesson.emoji}</Text>

            <View style={learnStyles.lessonDetails}>
              <Text style={[learnStyles.lessonTitle, { color: C.ink }]}>
                {lesson.title[lang]}
              </Text>

              <Text style={styles.body}>
                {lesson.description[lang]}
              </Text>
            </View>

            <Text style={learnStyles.start}>Start →</Text>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}
