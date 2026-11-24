import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Alert,
  ScrollView,
  Text,
  Pressable,
  View,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Card, C, PrimaryButton, styles } from "../../src/components/ui";
import { lessons } from "../../src/data/lessons";
import {
  getLanguage,
  getStars,
  saveResult,
  recordActivityAttempt,
  getProgress,
  ProgressRow,
} from "../../src/lib/storage";
import { strings } from "../../src/i18n/strings";
import { lessonStyles } from "../styles/lesson.styles";
import { progressStyles } from "../styles/progress.styles";

const CELEBRATED_KEY = "@little_learners_celebrated_achievements";

const confettiPieces = ["🎉", "⭐", "✨", "🎊", "🌟", "🎈", "⭐", "✨"];

type Achievement = {
  id: string;
  emoji: string;
  title: { en: string; sw: string };
  description: { en: string; sw: string };
  unlocked: boolean;
};

function getAchievements(rows: ProgressRow[]): Achievement[] {
  const totalStars = rows.reduce(
    (sum, row) => sum + getStars(row.score, row.total),
    0,
  );

  const alphabetIds = new Set(
    lessons
      .filter((lesson) => /^letter-[a-z]$/.test(lesson.id))
      .map((lesson) => lesson.id),
  );

  const completedLetters = new Set(
    rows
      .filter((row) => alphabetIds.has(row.lesson_id))
      .map((row) => row.lesson_id),
  ).size;

  return [
    {
      id: "first",
      emoji: "🌱",
      title: { en: "First Steps", sw: "Hatua za Kwanza" },
      description: {
        en: "Complete your first lesson",
        sw: "Kamilisha somo lako la kwanza",
      },
      unlocked: rows.length >= 1,
    },
    {
      id: "five",
      emoji: "📚",
      title: { en: "Bookworm", sw: "Mpenda Vitabu" },
      description: { en: "Complete 5 lessons", sw: "Kamilisha masomo 5" },
      unlocked: rows.length >= 5,
    },
    {
      id: "ten",
      emoji: "🎓",
      title: { en: "Learning Champion", sw: "Bingwa wa Kujifunza" },
      description: { en: "Complete 10 lessons", sw: "Kamilisha masomo 10" },
      unlocked: rows.length >= 10,
    },
    {
      id: "ten-stars",
      emoji: "⭐",
      title: { en: "Star Collector", sw: "Mkusanyaji wa Nyota" },
      description: { en: "Earn 10 stars", sw: "Pata nyota 10" },
      unlocked: totalStars >= 10,
    },
    {
      id: "twenty-five-stars",
      emoji: "🌟",
      title: { en: "Shining Star", sw: "Nyota Inayong’aa" },
      description: { en: "Earn 25 stars", sw: "Pata nyota 25" },
      unlocked: totalStars >= 25,
    },
    {
      id: "fifty-stars",
      emoji: "🏆",
      title: { en: "Superstar", sw: "Bingwa Mkuu" },
      description: { en: "Earn 50 stars", sw: "Pata nyota 50" },
      unlocked: totalStars >= 50,
    },
    {
      id: "perfect",
      emoji: "💯",
      title: { en: "Perfect Lesson", sw: "Somo Kamili" },
      description: {
        en: "Get every question right",
        sw: "Jibu maswali yote kwa usahihi",
      },
      unlocked: rows.some((row) => row.total > 0 && row.score === row.total),
    },
    {
      id: "letter-explorer",
      emoji: "🔤",
      title: { en: "Letter Explorer", sw: "Mvumbuzi wa Herufi" },
      description: {
        en: "Complete 5 different alphabet lessons",
        sw: "Kamilisha masomo 5 tofauti ya herufi",
      },
      unlocked: completedLetters >= 5,
    },
    {
      id: "alphabet-builder",
      emoji: "📖",
      title: { en: "Alphabet Builder", sw: "Mjenzi wa Alfabeti" },
      description: {
        en: "Complete 10 different alphabet lessons",
        sw: "Kamilisha masomo 10 tofauti ya herufi",
      },
      unlocked: completedLetters >= 10,
    },
    {
      id: "alphabet-superstar",
      emoji: "🏆",
      title: { en: "Alphabet Superstar", sw: "Bingwa wa Alfabeti" },
      description: {
        en: "Complete all 26 alphabet lessons",
        sw: "Kamilisha masomo yote 26 ya alfabeti",
      },
      unlocked: completedLetters >= 26,
    },
    {
      id: "counting-to-30",
      emoji: "🔢",
      title: { en: "Counting Star", sw: "Nyota ya Kuhesabu" },
      description: {
        en: "Complete Counting to 30",
        sw: "Kamilisha somo la Kuhesabu hadi 30",
      },
      unlocked: rows.some((row) => row.lesson_id === "count-to-30"),
    },
    {
      id: "counting-to-50",
      emoji: "🧮",
      title: { en: "Number Explorer", sw: "Mvumbuzi wa Namba" },
      description: {
        en: "Complete Counting to 50",
        sw: "Kamilisha somo la Kuhesabu hadi 50",
      },
      unlocked: rows.some((row) => row.lesson_id === "count-to-50"),
    },
    {
      id: "counting-to-100",
      emoji: "💯",
      title: { en: "Century Champion", sw: "Bingwa wa Mia" },
      description: {
        en: "Complete Counting to 100",
        sw: "Kamilisha somo la Kuhesabu hadi 100",
      },
      unlocked: rows.some((row) => row.lesson_id === "count-to-100"),
    },
    {
      id: "addition-master",
      emoji: "➕",
      title: { en: "Addition Master", sw: "Bingwa wa Kujumlisha" },
      description: {
        en: "Complete Adding Small Numbers",
        sw: "Kamilisha somo la Kujumlisha Namba Ndogo",
      },
      unlocked: rows.some((row) => row.lesson_id === "add-small"),
    },
    {
      id: "subtraction-master",
      emoji: "➖",
      title: { en: "Subtraction Master", sw: "Bingwa wa Kutoa" },
      description: {
        en: "Complete Taking Away Small Numbers",
        sw: "Kamilisha somo la Kutoa Namba Ndogo",
      },
      unlocked: rows.some((row) => row.lesson_id === "subtraction"),
    },
  ];
}

export default function LessonPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id);

  const [lang, setLang] = useState<"en" | "sw">("en");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recording, setRecording] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const popAnimation = useRef(new Animated.Value(0.2)).current;
  const confettiAnimation = useRef(new Animated.Value(0)).current;
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  const recordedQuestions = useRef<Set<number>>(new Set());

  useEffect(() => {
    getLanguage().then(setLang);
  }, []);

  // Run the celebration when the results screen becomes visible.
  useEffect(() => {
    if (!finished || newAchievements.length === 0) return;

    popAnimation.setValue(0.2);
    confettiAnimation.setValue(0);
    bannerOpacity.setValue(1);

    const animation = Animated.parallel([
      Animated.sequence([
        Animated.spring(popAnimation, {
          toValue: 1.5,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(popAnimation, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(confettiAnimation, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(3500),
        Animated.timing(bannerOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    finished,
    newAchievements.length,
    popAnimation,
    confettiAnimation,
    bannerOpacity,
  ]);

  if (!lesson) {
    return (
      <View style={[styles.screen, lessonStyles.content]}>
        <Text>Lesson not found.</Text>
        <PrimaryButton title="Go back" onPress={() => router.back()} />
      </View>
    );
  }

  const t = strings[lang];
  const questions = lesson.questions[lang];
  const question = questions[index];

  const activityType = question.type ?? "multiple_choice";
  const correct = selected === question.answer;
  const earnedStars = getStars(score, questions.length);

  const speak = (text: string) => {
    Speech.speak(text, {
      language: lang === "sw" ? "sw-KE" : "en-US",
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
            lang === "en" ? "Progress not saved" : "Maendeleo hayakuhifadhiwa",
            lang === "en"
              ? "Your answer was checked, but activity progress could not be recorded."
              : "Jibu lako limekaguliwa, lakini shughuli haikuweza kurekodiwa.",
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
    if (saving) return;

    setSaving(true);

    try {
      const previousRows = await getProgress();
      const previousAchievements = getAchievements(previousRows);

      await saveResult(lesson.id, score, questions.length);

      const updatedRows = await getProgress();
      const updatedAchievements = getAchievements(updatedRows);

      const previouslyUnlocked = new Set(
        previousAchievements
          .filter((item) => item.unlocked)
          .map((item) => item.id),
      );

      const savedCelebrations = await AsyncStorage.getItem(CELEBRATED_KEY);

      const celebrated: string[] = savedCelebrations
        ? JSON.parse(savedCelebrations)
        : previousAchievements
            .filter((item) => item.unlocked)
            .map((item) => item.id);

      const newlyUnlocked = updatedAchievements.filter(
        (item) =>
          item.unlocked &&
          !previouslyUnlocked.has(item.id) &&
          !celebrated.includes(item.id),
      );

      if (newlyUnlocked.length > 0) {
        setNewAchievements(newlyUnlocked);

        await AsyncStorage.setItem(
          CELEBRATED_KEY,
          JSON.stringify([
            ...new Set([
              ...celebrated,
              ...newlyUnlocked.map((item) => item.id),
            ]),
          ]),
        );
      }

      setFinished(true);
    } catch (error) {
      Alert.alert(
        lang === "en" ? "Progress not saved" : "Maendeleo hayakuhifadhiwa",
        lang === "en"
          ? "We could not save your lesson. Please try again."
          : "Hatukuweza kuhifadhi somo lako. Tafadhali jaribu tena.",
      );
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
          {newAchievements.length > 0 && (
            <Animated.View
              style={[
                progressStyles.celebrationBanner,
                { opacity: bannerOpacity },
              ]}
            >
              <View style={progressStyles.confettiRow}>
                {confettiPieces.map((piece, pieceIndex) => (
                  <Animated.Text
                    key={pieceIndex}
                    style={[
                      progressStyles.confettiPiece,
                      {
                        left: `${pieceIndex * 12}%`,
                        opacity: confettiAnimation.interpolate({
                          inputRange: [0, 0.1, 0.8, 1],
                          outputRange: [0, 1, 1, 0],
                        }),
                        transform: [
                          {
                            translateY: confettiAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-20, 130 + pieceIndex * 10],
                            }),
                          },
                          {
                            rotate: confettiAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                "0deg",
                                `${360 + pieceIndex * 90}deg`,
                              ],
                            }),
                          },
                          {
                            scale: confettiAnimation.interpolate({
                              inputRange: [0, 0.5, 1],
                              outputRange: [0.4, 1.5, 0.8],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {piece}
                  </Animated.Text>
                ))}
              </View>

              <Animated.Text
                style={[
                  progressStyles.celebrationEmoji,
                  { transform: [{ scale: popAnimation }] },
                ]}
              >
                {newAchievements[0].emoji}
              </Animated.Text>

              <Text style={progressStyles.celebrationTitle}>
                {lang === "en" ? "Amazing work!" : "Hongera sana!"}
              </Text>

              <Text style={progressStyles.celebrationMessage}>
                {newAchievements.length === 1
                  ? lang === "en"
                    ? `You unlocked ${newAchievements[0].title.en}!`
                    : `Umefungua tuzo ya ${newAchievements[0].title.sw}!`
                  : lang === "en"
                    ? `You unlocked ${newAchievements.length} achievements!`
                    : `Umefungua tuzo ${newAchievements.length}!`}
              </Text>
            </Animated.View>
          )}

          <Text style={lessonStyles.resultEmoji}>🎉</Text>

          <Text style={styles.title}>{t.result}</Text>

          <Text style={styles.body}>{lesson.title[lang]}</Text>

          <Text style={lessonStyles.resultScore}>
            {score}/{questions.length}
          </Text>

          <Text style={styles.body}>{t.score}</Text>

          <Text style={lessonStyles.resultStars}>
            {Array.from({ length: 3 }, (_, i) =>
              i < earnedStars ? "⭐" : "☆",
            ).join(" ")}
          </Text>

          <Text style={styles.body}>
            {earnedStars} / 3{" "}
            {lang === "en" ? "stars earned" : "nyota ulizopata"}
          </Text>

          <PrimaryButton
            title={t.back}
            onPress={() => router.replace("/(tabs)/learn")}
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
          ← {lang === "en" ? "Exit lesson" : "Toka kwenye somo"}
        </Text>
      </Pressable>

      <View style={[lessonStyles.hero, { backgroundColor: lesson.colour }]}>
        <Text style={lessonStyles.heroEmoji}>{lesson.emoji}</Text>

        <Text style={styles.title}>{lesson.title[lang]}</Text>

        <Text style={styles.body}>{lesson.description[lang]}</Text>

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
          {lang === "en" ? "Let’s learn" : "Tujifunze"}
        </Text>

        <Text style={styles.body}>{lesson.intro[lang]}</Text>

        <Pressable
          onPress={() => speak(lesson.intro[lang])}
          style={lessonStyles.listenButton}
        >
          <Text>🔊</Text>
          <Text style={lessonStyles.listenText}>
            {lang === "en" ? "Listen" : "Sikiliza"}
          </Text>
        </Pressable>
      </Card>

      <Card>
        <Text style={lessonStyles.questionLabel}>
          {lang === "en" ? "QUESTION" : "SWALI"} {index + 1}
        </Text>

        <Text style={lessonStyles.questionPrompt}>{question.prompt}</Text>

        <Pressable onPress={() => speak(question.prompt)}>
          <Text style={lessonStyles.hearQuestion}>
            🔊 {lang === "en" ? "Hear question" : "Sikiliza swali"}
          </Text>
        </Pressable>

        {activityType === "picture" ? (
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
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 16,
                      borderColor: isCorrect
                        ? "#37A66B"
                        : isSelected
                          ? C.primary
                          : C.border,
                      backgroundColor: isCorrect
                        ? "#E5F7EA"
                        : isSelected
                          ? C.purple
                          : "#FFFFFF",
                    },
                  ]}
                >
                  <Text style={{ fontSize: 38 }}>{option.emoji}</Text>

                  <Text style={lessonStyles.optionText}>{option.label}</Text>
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
                      ? "#37A66B"
                      : isSelected
                        ? C.primary
                        : C.border,
                    backgroundColor: isCorrect
                      ? "#E5F7EA"
                      : isSelected
                        ? C.purple
                        : "#FFFFFF",
                  },
                ]}
              >
                <Text style={lessonStyles.optionText}>{option}</Text>
              </Pressable>
            );
          })
        )}

        {checked && (
          <View
            style={[
              lessonStyles.feedback,
              {
                backgroundColor: correct ? "#E5F7EA" : "#FFF0D8",
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
                ? lang === "en"
                  ? "Saving..."
                  : "Inahifadhi..."
                : checked
                  ? index === questions.length - 1
                    ? t.finish
                    : t.next
                  : t.check
            }
            disabled={!selected || saving || recording}
            onPress={checked && index === questions.length - 1 ? finish : next}
          />
        </View>
      </Card>
    </ScrollView>
  );
}
