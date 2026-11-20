
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, Pressable, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as Speech from 'expo-speech';

import { Card, C, PrimaryButton, styles } from '../../src/components/ui';
import { lessons } from '../../src/data/lessons';
import {
  getLanguage,
  getStars,
  saveResult,
  recordActivityAttempt,
} from '../../src/lib/storage';
import { strings } from '../../src/i18n/strings';
import { lessonStyles } from '../styles/lesson.styles';

export default function LessonPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id);

  const [lang, setLang] = useState<'en' | 'sw'>('en');
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recording, setRecording] = useState(false);

  // Prevent the same question from being recorded twice.
  const recordedQuestions = useRef<Set<number>>(new Set());

  useEffect(() => {
    getLanguage().then(setLang);
  }, []);

  if (!lesson) {
    return (
      <View style={[styles.screen, lessonStyles.content]}>
        <Text>Lesson not found.</Text>
        <PrimaryButton
          title="Go back"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  const t = strings[lang];
  const questions = lesson.questions[lang];
  const question = questions[index];

  const activityType = question.type ?? 'multiple_choice';
  const correct = selected === question.answer;
  const earnedStars = getStars(score, questions.length);

  const speak = (text: string) => {
    Speech.speak(text, {
      language: lang === 'sw' ? 'sw-KE' : 'en-US',
      rate: 0.82,
    });
  };

  const next = async () => {
    if (!checked) {
      if (!selected) return;

      setChecked(true);

      if (correct) {
        setScore((current) => current + 1);
      }

      if (!recordedQuestions.current.has(index)) {
        recordedQuestions.current.add(index);
        setRecording(true);

        try {
          await recordActivityAttempt(lesson.id, activityType);
        } catch {
          recordedQuestions.current.delete(index);
          Alert.alert(
            lang === 'en' ? 'Progress not saved' : 'Maendeleo hayakuhifadhiwa',
            lang === 'en'
              ? 'Your answer was checked, but activity progress could not be recorded.'
              : 'Jibu lako limekaguliwa, lakini shughuli haikuweza kurekodiwa.'
          );
        } finally {
          setRecording(false);
        }
      }

      return;
    }

    if (index < questions.length - 1) {
      setIndex((current) => current + 1);
      setSelected(null);
      setChecked(false);
    }
  };

  const finish = async () => {
    setSaving(true);

    try {
      await saveResult(lesson.id, score, questions.length);
      setFinished(true);
    } finally {
      setSaving(false);
    }
  };

  if (finished) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={lessonStyles.resultContent}
      >
        <Card style={lessonStyles.resultCard}>
          <Text style={lessonStyles.resultEmoji}>🎉</Text>

          <Text style={styles.title}>{t.result}</Text>

          <Text style={styles.body}>
            {lesson.title[lang]}
          </Text>

          <Text style={lessonStyles.resultScore}>
            {score}/{questions.length}
          </Text>

          <Text style={styles.body}>{t.score}</Text>

          <Text style={lessonStyles.resultStars}>
            {Array.from(
              { length: 3 },
              (_, i) => i < earnedStars ? '⭐' : '☆'
            ).join(' ')}
          </Text>

          <Text style={styles.body}>
            {earnedStars} / 3 {lang === 'en' ? 'stars earned' : 'nyota ulizopata'}
          </Text>

          <PrimaryButton
            title={t.back}
            onPress={() => router.replace('/(tabs)/learn')}
          />
        </Card>
      </ScrollView>
    );
  }

  const pictureOptions = question.pictureOptions ?? [];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={lessonStyles.content}
    >
      <Pressable onPress={() => router.back()}>
        <Text style={lessonStyles.exitText}>
          ← {lang === 'en' ? 'Exit lesson' : 'Toka kwenye somo'}
        </Text>
      </Pressable>

      <View
        style={[
          lessonStyles.hero,
          { backgroundColor: lesson.colour },
        ]}
      >
        <Text style={lessonStyles.heroEmoji}>
          {lesson.emoji}
        </Text>

        <Text style={styles.title}>
          {lesson.title[lang]}
        </Text>

        <Text style={styles.body}>
          {lesson.description[lang]}
        </Text>

        <Text style={lessonStyles.heroMeta}>
          {t.lesson} {index + 1} / {questions.length}
        </Text>

        <View style={lessonStyles.progressTrack}>
          <View
            style={[
              lessonStyles.progressFill,
              {
                width: `${((index + 1) / questions.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <Card>
        <Text style={lessonStyles.sectionHeading}>
          {lang === 'en' ? 'Let’s learn' : 'Tujifunze'}
        </Text>

        <Text style={styles.body}>
          {lesson.intro[lang]}
        </Text>

        <Pressable
          onPress={() => speak(lesson.intro[lang])}
          style={lessonStyles.listenButton}
        >
          <Text>🔊</Text>
          <Text style={lessonStyles.listenText}>
            {lang === 'en' ? 'Listen' : 'Sikiliza'}
          </Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={lessonStyles.questionLabel}>
          {lang === 'en' ? 'QUESTION' : 'SWALI'} {index + 1}
        </Text>

        <Text style={lessonStyles.questionPrompt}>
          {question.prompt}
        </Text>

        <Pressable onPress={() => speak(question.prompt)}>
          <Text style={lessonStyles.hearQuestion}>
            🔊 {lang === 'en' ? 'Hear question' : 'Sikiliza swali'}
          </Text>
        </Pressable>

        {activityType === 'picture' ? (
          <View style={{ gap: 12 }}>
            {pictureOptions.map((option) => {
              const isCorrect = checked && option.label === question.answer;
              const isSelected = selected === option.label;

              return (
                <Pressable
                  key={option.label}
                  disabled={checked}
                  onPress={() => setSelected(option.label)}
                  style={[
                    lessonStyles.option,
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      gap: 16,
                      borderColor: isCorrect
                        ? '#37A66B'
                        : isSelected
                          ? C.primary
                          : C.border,
                      backgroundColor: isCorrect
                        ? '#E5F7EA'
                        : isSelected
                          ? C.purple
                          : '#FFFFFF',
                    },
                  ]}
                >
                  <Text style={{ fontSize: 38 }}>
                    {option.emoji}
                  </Text>

                  <Text style={lessonStyles.optionText}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          question.options.map((option) => {
            const isCorrect = checked && option === question.answer;
            const isSelected = selected === option;

            return (
              <Pressable
                key={option}
                disabled={checked}
                onPress={() => setSelected(option)}
                style={[
                  lessonStyles.option,
                  {
                    borderColor: isCorrect
                      ? '#37A66B'
                      : isSelected
                        ? C.primary
                        : C.border,
                    backgroundColor: isCorrect
                      ? '#E5F7EA'
                      : isSelected
                        ? C.purple
                        : '#FFFFFF',
                  },
                ]}
              >
                <Text style={lessonStyles.optionText}>
                  {option}
                </Text>
              </Pressable>
            );
          })
        )}

        {checked && (
          <View
            style={[
              lessonStyles.feedback,
              {
                backgroundColor: correct
                  ? '#E5F7EA'
                  : '#FFF0D8',
              },
            ]}
          >
            <Text style={lessonStyles.feedbackTitle}>
              {correct ? t.correct : t.incorrect}
            </Text>

            <Text style={styles.body}>
              {t.hint}: {question.hint}
            </Text>
          </View>
        )}

        <View style={lessonStyles.actionArea}>
          <PrimaryButton
            title={
              recording
                ? (lang === 'en' ? 'Saving...' : 'Inahifadhi...')
                : checked
                  ? index === questions.length - 1
                    ? t.finish
                    : t.next
                  : t.check
            }
            disabled={!selected || saving || recording}
            onPress={
              checked && index === questions.length - 1
                ? finish
                : next
            }
          />
        </View>
      </Card>
    </ScrollView>
  );
}
