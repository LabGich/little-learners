
import { StyleSheet } from 'react-native';

export const learnStyles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 36,
    gap: 16,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectDetails: {
    flex: 1,
    gap: 3,
  },
  subjectEmoji: {
    fontSize: 34,
  },
  subjectTitle: {
    fontSize: 17,
    fontWeight: '900',
  },
  arrow: {
    fontSize: 22,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonEmoji: {
    fontSize: 27,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontWeight: '800',
  },
  start: {
    color: '#5B6EE1',
    fontWeight: '900',
  },
});
