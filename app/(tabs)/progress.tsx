import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import { Card, SectionTitle, styles } from "../../src/components/ui";
import { lessons } from "../../src/data/lessons";
import {
  getLanguage,
  getProgress,
  getStars,
  ProgressRow,
} from "../../src/lib/storage";
import { strings } from "../../src/i18n/strings";
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

export default function Progress() {
  const [lang, setLang] = useState<"en" | "sw">("en");
  const [rows, setRows] = useState<ProgressRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [newUnlocks, setNewUnlocks] = useState<string[]>([]);

  const popAnimation = useRef(new Animated.Value(1)).current;
  const confettiAnimation = useRef(new Animated.Value(0)).current;
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let active = true;

      (async () => {
        const language = await getLanguage();
        const progress = await getProgress();

        if (active) {
          setLang(language);
          setRows(progress);
          setLoaded(true);
        }
      })();

      return () => {
        active = false;
      };
    }, []),
  );

  const t = strings[lang];

  const totalStars = rows.reduce(
    (sum, row) => sum + getStars(row.score, row.total),
    0,
  );

  // Count distinct completed alphabet lessons only.
  const alphabetLessonIds = new Set(
    lessons
      .filter((lesson) => /^letter-[a-z]$/.test(lesson.id))
      .map((lesson) => lesson.id),
  );

  const completedAlphabetLetters = new Set(
    rows
      .filter((row) => alphabetLessonIds.has(row.lesson_id))
      .map((row) => row.lesson_id),
  ).size;

  const achievements: Achievement[] = [
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
      description: {
        en: "Complete 5 lessons",
        sw: "Kamilisha masomo 5",
      },
      unlocked: rows.length >= 5,
    },
    {
      id: "ten",
      emoji: "🎓",
      title: { en: "Learning Champion", sw: "Bingwa wa Kujifunza" },
      description: {
        en: "Complete 10 lessons",
        sw: "Kamilisha masomo 10",
      },
      unlocked: rows.length >= 10,
    },
    {
      id: "ten-stars",
      emoji: "⭐",
      title: { en: "Star Collector", sw: "Mkusanyaji wa Nyota" },
      description: {
        en: "Earn 10 stars",
        sw: "Pata nyota 10",
      },
      unlocked: totalStars >= 10,
    },
    {
      id: "twenty-five-stars",
      emoji: "🌟",
      title: { en: "Shining Star", sw: "Nyota Inayong’aa" },
      description: {
        en: "Earn 25 stars",
        sw: "Pata nyota 25",
      },
      unlocked: totalStars >= 25,
    },
    {
      id: "fifty-stars",
      emoji: "🏆",
      title: { en: "Superstar", sw: "Bingwa Mkuu" },
      description: {
        en: "Earn 50 stars",
        sw: "Pata nyota 50",
      },
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
      unlocked: completedAlphabetLetters >= 5,
    },
    {
      id: "alphabet-builder",
      emoji: "📖",
      title: { en: "Alphabet Builder", sw: "Mjenzi wa Alfabeti" },
      description: {
        en: "Complete 10 different alphabet lessons",
        sw: "Kamilisha masomo 10 tofauti ya herufi",
      },
      unlocked: completedAlphabetLetters >= 10,
    },
    {
      id: "alphabet-superstar",
      emoji: "🏆",
      title: { en: "Alphabet Superstar", sw: "Bingwa wa Alfabeti" },
      description: {
        en: "Complete all 26 alphabet lessons",
        sw: "Kamilisha masomo yote 26 ya alfabeti",
      },
      unlocked: completedAlphabetLetters >= 26,
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

  const unlockedCount = achievements.filter((item) => item.unlocked).length;

  const unlockedIds = achievements
    .filter((item) => item.unlocked)
    .map((item) => item.id);

  const unlockedIdsKey = unlockedIds.join("|");

  // Detect achievements that have been unlocked for the first time.
  useEffect(() => {
    if (!loaded) return;

    let active = true;

    const checkAchievements = async () => {
      try {
        const saved = await AsyncStorage.getItem(CELEBRATED_KEY);

        if (!active) return;

        // On first use, register existing achievements without
        // celebrating old progress.
        if (saved === null) {
          await AsyncStorage.setItem(
            CELEBRATED_KEY,
            JSON.stringify(unlockedIds),
          );
          return;
        }

        const celebrated: string[] = JSON.parse(saved);

        const newlyUnlocked = unlockedIds.filter(
          (id) => !celebrated.includes(id),
        );

        if (newlyUnlocked.length > 0) {
          setNewUnlocks(newlyUnlocked);

          await AsyncStorage.setItem(
            CELEBRATED_KEY,
            JSON.stringify([...celebrated, ...newlyUnlocked]),
          );
        }
      } catch (error) {
        console.warn("Could not check achievement celebrations:", error);
      }
    };

    checkAchievements();

    return () => {
      active = false;
    };
  }, [loaded, unlockedIdsKey]);

  // Animate the achievement cards and celebration banner.
  useEffect(() => {
    if (newUnlocks.length === 0) return;

    popAnimation.stopAnimation();
    confettiAnimation.stopAnimation();
    bannerOpacity.stopAnimation();

    popAnimation.setValue(0.2);
    confettiAnimation.setValue(0);
    bannerOpacity.setValue(1);

    Animated.parallel([
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
    ]).start(() => {
      setNewUnlocks([]);
    });
  }, [newUnlocks.length]);

  const celebratedAchievement = achievements.find(
    (item) => item.id === newUnlocks[0],
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={progressStyles.content}
    >
      <Text style={styles.title}>{t.progress}</Text>

      <Text style={styles.body}>
        {lang === "en"
          ? "Every lesson is a step forward. Keep going!"
          : "Kila somo ni hatua mbele. Endelea!"}
      </Text>

      {newUnlocks.length > 0 && (
        <Animated.View
          style={[progressStyles.celebrationBanner, { opacity: bannerOpacity }]}
        >
          <View style={progressStyles.confettiRow}>
            {confettiPieces.map((piece, index) => (
              <Animated.Text
                key={index}
                style={[
                  progressStyles.confettiPiece,
                  {
                    left: `${index * 12}%`,
                    opacity: confettiAnimation.interpolate({
                      inputRange: [0, 0.1, 0.8, 1],
                      outputRange: [0, 1, 1, 0],
                    }),
                    transform: [
                      {
                        translateY: confettiAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 130 + index * 10],
                        }),
                      },
                      {
                        rotate: confettiAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", `${360 + index * 90}deg`],
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
            {celebratedAchievement?.emoji || "🏆"}
          </Animated.Text>

          <Text style={progressStyles.celebrationTitle}>
            {lang === "en" ? "Amazing work!" : "Hongera sana!"}
          </Text>

          <Text style={progressStyles.celebrationMessage}>
            {newUnlocks.length === 1
              ? lang === "en"
                ? `You unlocked ${celebratedAchievement?.title.en}!`
                : `Umefungua tuzo ya ${celebratedAchievement?.title.sw}!`
              : lang === "en"
                ? `You unlocked ${newUnlocks.length} achievements!`
                : `Umefungua tuzo ${newUnlocks.length}!`}
          </Text>
        </Animated.View>
      )}

      <View style={progressStyles.summaryRow}>
        <Card style={progressStyles.summaryCard}>
          <Text style={progressStyles.summaryIcon}>📚</Text>
          <Text style={progressStyles.summaryNumber}>{rows.length}</Text>
          <Text style={progressStyles.summaryLabel}>{t.completed}</Text>
        </Card>

        <Card style={progressStyles.summaryCard}>
          <Text style={progressStyles.summaryIcon}>⭐</Text>
          <Text style={progressStyles.summaryNumber}>{totalStars}</Text>
          <Text style={progressStyles.summaryLabel}>{t.stars}</Text>
        </Card>
      </View>

      <View style={progressStyles.achievementHeader}>
        <SectionTitle>
          {lang === "en" ? "🏆 Achievements" : "🏆 Mafanikio"}
        </SectionTitle>

        <Text style={progressStyles.achievementCount}>
          {unlockedCount}/{achievements.length}
        </Text>
      </View>

      <View style={progressStyles.achievementGrid}>
        {achievements.map((achievement) => {
          const isNew = newUnlocks.includes(achievement.id);

          return (
            <Animated.View
              key={achievement.id}
              style={
                isNew
                  ? {
                      transform: [{ scale: popAnimation }],
                    }
                  : undefined
              }
            >
              <Card
                style={[
                  progressStyles.achievementCard,
                  !achievement.unlocked && progressStyles.achievementLocked,
                ]}
              >
                <Text style={progressStyles.achievementIcon}>
                  {achievement.unlocked ? achievement.emoji : "🔒"}
                </Text>

                <Text style={progressStyles.achievementTitle}>
                  {achievement.title[lang]}
                </Text>

                <Text style={progressStyles.achievementDescription}>
                  {achievement.description[lang]}
                </Text>

                <Text
                  style={[
                    progressStyles.achievementStatus,
                    !achievement.unlocked && progressStyles.lockedStatus,
                  ]}
                >
                  {achievement.unlocked
                    ? lang === "en"
                      ? "UNLOCKED ✓"
                      : "UMEFUNGULIWA ✓"
                    : lang === "en"
                      ? "LOCKED"
                      : "IMEFUNGWA"}
                </Text>
              </Card>
            </Animated.View>
          );
        })}
      </View>

      <SectionTitle>{t.activity}</SectionTitle>

      {rows.length === 0 ? (
        <Card>
          <Text style={progressStyles.emptyIcon}>🌱</Text>
          <Text style={styles.body}>{t.noProgress}</Text>
        </Card>
      ) : (
        rows.map((row) => {
          const lesson = lessons.find((item) => item.id === row.lesson_id);

          const stars = getStars(row.score, row.total);

          return (
            <Card key={row.lesson_id} style={progressStyles.activityCard}>
              <Text style={progressStyles.activityEmoji}>
                {lesson?.emoji || "📘"}
              </Text>

              <View style={progressStyles.activityDetails}>
                <Text style={progressStyles.activityTitle}>
                  {lesson?.title[lang] || row.lesson_id}
                </Text>

                <Text style={styles.body}>
                  {lang === "en" ? "Score" : "Alama"}: {row.score}/{row.total} •{" "}
                  {new Date(row.completed_at).toLocaleDateString()}
                </Text>
              </View>

              <Text style={progressStyles.activityDate}>
                {Array.from({ length: 3 }, (_, i) =>
                  i < stars ? "⭐" : "☆",
                ).join("")}
              </Text>
            </Card>
          );
        })
      )}
    </ScrollView>
  );
}
