
import { StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing, radius } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export const lessonStyles = StyleSheet.create({
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl + 4,
    gap: spacing.lg,
  },
  resultContent: {
    padding: spacing.xl,
    justifyContent: 'center',
    flexGrow: 1,
  },
  exitText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  hero: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  heroEmoji: {
    fontSize: 44,
  },
  heroMeta: {
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#FFFFFF99',
    borderRadius: radius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.round,
  },
  sectionHeading: {
    fontWeight: typography.weights.black,
    fontSize: typography.sizes.subtitle,
    color: colors.ink,
  },
  listenButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.purple,
    padding: spacing.md,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  listenText: {
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  questionLabel: {
    fontSize: typography.sizes.small,
    color: colors.muted,
    fontWeight: typography.weights.bold,
  },
  questionPrompt: {
    fontSize: 22,
    fontWeight: typography.weights.black,
    color: colors.ink,
    lineHeight: 30,
  },
  hearQuestion: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  option: {
    padding: spacing.lg,
    borderRadius: 15,
    borderWidth: 2,
    marginTop: 9,
  },
  optionText: {
    fontSize: typography.sizes.subtitle,
    fontWeight: typography.weights.bold,
    color: colors.ink,
  },
  feedback: {
    padding: 13,
    borderRadius: radius.md,
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  feedbackTitle: {
    fontWeight: typography.weights.black,
    color: colors.ink,
  },
  actionArea: {
    marginTop: spacing.md,
  },
  resultCard: {
    alignItems: 'center',
    padding: 28,
  },
  resultEmoji: {
    fontSize: 64,
  },
  resultScore: {
    fontSize: 38,
    fontWeight: typography.weights.black,
    color: colors.primary,
  },
  resultStars: {
    fontSize: 26,
  },
});
