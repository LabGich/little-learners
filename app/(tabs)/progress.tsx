import React, { useCallback, useEffect, useRef, useState } from "react";
import { Easing, ScrollView, Text, View } from "react-native";
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

          return (
            <View key={achievement.id}>
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
            </View>
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
