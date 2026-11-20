import type { Lang } from '../data/lessons';
export const strings: Record<Lang, Record<string, string>> = {
  en: {
    home: 'Home', learn: 'Learn', progress: 'My progress', parent: 'Parent', hello: 'Hello',
    choose: 'What would you like to learn today?', today: "Today's learning", subjects: 'Learning adventures',
    completed: 'lessons completed', stars: 'stars earned', start: 'Start learning', continue: 'Continue',
    lesson: 'Lesson', check: 'Check answer', next: 'Next question', finish: 'Finish lesson',
    correct: 'Great job!', incorrect: 'Good try! Let’s learn together.', hint: 'Hint',
    result: 'Lesson complete!', score: 'Your score', back: 'Back to learning',
    language: 'App language', english: 'English', swahili: 'Kiswahili',
    parentTitle: 'Parent corner', parentDesc: 'A grown-up can manage learning here.', childName: "Child's name",
    age: 'Learning age', save: 'Save settings', reset: 'Reset learning progress',
    noProgress: 'Your learning adventure starts here. Complete a lesson to see your progress!',
    offline: 'Ready for offline learning', offlineDesc: 'Lessons and progress are saved on this device.',
    dailyTip: 'Little steps every day make big discoveries.', activity: 'Recent activity',
    privacy: 'This starter app stores learning progress on this device. Cloud sync can be connected in the next setup step.'
  },
  sw: {
    home: 'Nyumbani', learn: 'Jifunze', progress: 'Maendeleo yangu', parent: 'Mzazi', hello: 'Hujambo',
    choose: 'Ungependa kujifunza nini leo?', today: 'Mafunzo ya leo', subjects: 'Safari za kujifunza',
    completed: 'masomo yamekamilika', stars: 'nyota zimepatikana', start: 'Anza kujifunza', continue: 'Endelea',
    lesson: 'Somo', check: 'Angalia jibu', next: 'Swali linalofuata', finish: 'Maliza somo',
    correct: 'Hongera sana!', incorrect: 'Umejaribu vizuri! Tujifunze pamoja.', hint: 'Kidokezo',
    result: 'Somo limekamilika!', score: 'Alama zako', back: 'Rudi kujifunza',
    language: 'Lugha ya programu', english: 'English', swahili: 'Kiswahili',
    parentTitle: 'Sehemu ya mzazi', parentDesc: 'Mtu mzima anaweza kusimamia masomo hapa.', childName: 'Jina la mtoto',
    age: 'Umri wa kujifunza', save: 'Hifadhi mipangilio', reset: 'Futa maendeleo ya masomo',
    noProgress: 'Safari yako ya kujifunza inaanza hapa. Kamilisha somo kuona maendeleo yako!',
    offline: 'Tayari kujifunza bila intaneti', offlineDesc: 'Masomo na maendeleo yanahifadhiwa kwenye kifaa hiki.',
    dailyTip: 'Hatua ndogo kila siku huleta ugunduzi mkubwa.', activity: 'Shughuli za hivi karibuni',
    privacy: 'Programu hii ya mwanzo huhifadhi maendeleo kwenye kifaa hiki. Hifadhi ya mtandaoni itaunganishwa katika hatua inayofuata.'
  }
};
