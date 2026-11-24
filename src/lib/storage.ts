
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('little-learners.db');

let ready: Promise<void> | null = null;

export type ActivityType =
  | 'multiple_choice'
  | 'picture'
  | 'matching'
  | 'fill_blank'
  | 'ordering';

export type ActivityStats = {
  multiple_choice: number;
  picture: number;
  matching: number;
  fill_blank: number;
  ordering: number;
  total: number;
  learningDays: number;
};

async function initialise() {
  if (!ready) {
    ready = (async () => {
      const db = await dbPromise;

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS lesson_progress (
          lesson_id TEXT PRIMARY KEY NOT NULL,
          score INTEGER NOT NULL DEFAULT 0,
          total INTEGER NOT NULL DEFAULT 0,
          completed_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS activity_attempts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          lesson_id TEXT NOT NULL,
          activity_type TEXT NOT NULL,
          completed_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS learning_days (
          day TEXT PRIMARY KEY NOT NULL
        );
      `);
    })();
  }

  return ready;
}

// Shared star calculation.
export function getStars(score: number, total: number): number {
  if (total <= 0) return 0;

  const percentage = (score / total) * 100;

  if (percentage >= 80) return 3;
  if (percentage >= 50) return 2;

  return 1;
}

// Language settings.
export async function getLanguage(): Promise<'en' | 'sw'> {
  return (await AsyncStorage.getItem('language')) === 'sw' ? 'sw' : 'en';
}

export async function setLanguage(lang: 'en' | 'sw') {
  await AsyncStorage.setItem('language', lang);
}

// Child profile.
export async function getChildName(): Promise<string> {
  return (await AsyncStorage.getItem('childName')) || 'Superstar';
}

export async function setChildName(name: string) {
  await AsyncStorage.setItem('childName', name);
}

export async function getAge(): Promise<number> {
  return Number((await AsyncStorage.getItem('childAge')) || 6);
}

export async function setAge(age: number) {
  await AsyncStorage.setItem('childAge', String(age));
}

// Save a completed lesson.
export async function saveResult(
  id: string,
  score: number,
  total: number
) {
  await initialise();

  const db = await dbPromise;

  await db.runAsync(
    `INSERT OR REPLACE INTO lesson_progress
    (lesson_id, score, total, completed_at)
    VALUES (?, ?, ?, ?)`,
    id,
    score,
    total,
    new Date().toISOString()
  );
}

// Record a completed activity question.
// This also records the day on which learning took place.
export async function recordActivityAttempt(
  lessonId: string,
  activityType: ActivityType
) {
  await initialise();

  const db = await dbPromise;
  const now = new Date();

  const completedAt = now.toISOString();

  const learningDay = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');

  await db.runAsync(
    `INSERT INTO activity_attempts
    (lesson_id, activity_type, completed_at)
    VALUES (?, ?, ?)`,
    lessonId,
    activityType,
    completedAt
  );

  await db.runAsync(
    'INSERT OR IGNORE INTO learning_days (day) VALUES (?)',
    learningDay
  );
}

// Activity statistics for achievements and progress.
export async function getActivityStats(): Promise<ActivityStats> {
  await initialise();

  const db = await dbPromise;

  const counts = await db.getAllAsync<{
    activity_type: string;
    count: number;
  }>(
    `SELECT activity_type, COUNT(*) as count
     FROM activity_attempts
     GROUP BY activity_type`
  );

  const days = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM learning_days'
  );

  const stats: ActivityStats = {
    multiple_choice: 0,
    picture: 0,
    matching: 0,
    fill_blank: 0,
    ordering: 0,
    total: 0,
    learningDays: days?.count ?? 0,
  };

  for (const row of counts) {
    if (row.activity_type in stats) {
      const type = row.activity_type as ActivityType;
      stats[type] = row.count;
      stats.total += row.count;
    }
  }

  return stats;
}

// Existing lesson progress.
export type ProgressRow = {
  lesson_id: string;
  score: number;
  total: number;
  completed_at: string;
};

export async function getProgress(): Promise<ProgressRow[]> {
  await initialise();

  const db = await dbPromise;

  return db.getAllAsync<ProgressRow>(
    'SELECT * FROM lesson_progress ORDER BY completed_at DESC'
  );
}

// Merge progress from another device or backup.
export async function mergeProgress(rows: ProgressRow[]) {
  await initialise();

  const db = await dbPromise;

  for (const row of rows) {
    const local = await db.getFirstAsync<ProgressRow>(
      'SELECT * FROM lesson_progress WHERE lesson_id = ?',
      row.lesson_id
    );

    if (
      !local ||
      new Date(row.completed_at).getTime() >
        new Date(local.completed_at).getTime()
    ) {
      await db.runAsync(
        `INSERT OR REPLACE INTO lesson_progress
        (lesson_id, score, total, completed_at)
        VALUES (?, ?, ?, ?)`,
        row.lesson_id,
        row.score,
        row.total,
        row.completed_at
      );
    }
  }
}

// Clear all learning progress and activity records.
export async function clearProgress() {
  await initialise();

  const db = await dbPromise;

  await db.execAsync(`
    DELETE FROM lesson_progress;
    DELETE FROM activity_attempts;
    DELETE FROM learning_days;
  `);

  await AsyncStorage.removeItem(
    '@little_learners_celebrated_achievements'
  );
}
