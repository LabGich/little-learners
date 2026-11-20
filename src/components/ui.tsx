
import { StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

export { default as Card } from './Card';
export { default as PrimaryButton } from './PrimaryButton';
export { default as SectionTitle } from './SectionTitle';

export const C = {
  ink: colors.ink,
  muted: colors.muted,
  bg: colors.background,
  primary: colors.primary,
  purple: colors.purple,
  white: colors.white,
  green: colors.green,
  border: colors.border,
  orange: colors.orange,
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl + 4,
    gap: spacing.lg,
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.xl - 2,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 15,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: typography.weights.extraBold,
    fontSize: typography.sizes.body,
  },
  section: {
    color: colors.ink,
    fontSize: typography.sizes.section,
    fontWeight: typography.weights.extraBold,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.ink,
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.black,
  },
  body: {
    color: colors.muted,
    fontSize: typography.sizes.body,
    lineHeight: 22,
  },
  pill: {
    backgroundColor: colors.purple,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.round,
    alignSelf: 'flex-start',
  },
});
