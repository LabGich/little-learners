
import { StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing, radius } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export const parentStyles = StyleSheet.create({
  icon: {
    fontSize: 36,
  },
  cardTitle: {
    fontSize: typography.sizes.subtitle,
    fontWeight: typography.weights.extraBold,
    color: colors.ink,
  },
  sectionTitle: {
    fontSize: typography.sizes.subtitle,
    fontWeight: typography.weights.extraBold,
    color: colors.ink,
  },
  fieldLabel: {
    color: colors.muted,
    fontWeight: typography.weights.bold,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: typography.sizes.body,
    backgroundColor: colors.white,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: typography.sizes.heading,
    backgroundColor: colors.white,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  choice: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.purple,
  },
  choiceSelected: {
    backgroundColor: colors.primary,
  },
  choiceText: {
    fontWeight: typography.weights.extraBold,
    fontSize: typography.sizes.subtitle,
    color: colors.ink,
  },
  choiceTextSelected: {
    color: colors.white,
  },
  languageChoice: {
    padding: spacing.md,
  },
  languageText: {
    fontWeight: typography.weights.bold,
    color: colors.ink,
  },
  smallTopGap: {
    marginTop: spacing.sm,
  },
  signOut: {
    color: colors.primary,
    fontWeight: typography.weights.extraBold,
  },
  resetButton: {
    padding: spacing.md,
    backgroundColor: '#FFF0F0',
    borderRadius: radius.sm + 4,
    alignItems: 'center',
  },
  resetText: {
    color: '#B23B3B',
    fontWeight: typography.weights.extraBold,
  },
  lockText: {
    color: colors.primary,
    fontWeight: typography.weights.extraBold,
    textAlign: 'center',
  },
});
