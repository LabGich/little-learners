
import { StyleSheet } from 'react-native';

export const progressStyles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 36,
    gap: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryIcon: {
    fontSize: 30,
  },
  summaryNumber: {
    fontSize: 27,
    fontWeight: '900',
    color: '#243047',
  },
  summaryLabel: {
    color: '#68758A',
    fontSize: 12,
  },

  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievementCount: {
    color: '#5B6EE1',
    fontWeight: '900',
    fontSize: 13,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achievementCard: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
    minWidth: 140,
    paddingVertical: 16,
    gap: 7,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 36,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#243047',
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#68758A',
    textAlign: 'center',
    lineHeight: 17,
  },
  achievementStatus: {
    fontSize: 11,
    fontWeight: '900',
    color: '#3D9B68',
    marginTop: 3,
  },
  lockedStatus: {
    color: '#68758A',
  },

  celebrationBanner: {
    backgroundColor: '#EEEAFE',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8D0FF',
    overflow: 'hidden',
    gap: 6,
  },
  confettiRow: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 150,
  zIndex: 2,
  },
  confettiPiece: {
  position: 'absolute',
  top: 0,
  fontSize: 24,
  },
  celebrationEmoji: {
    fontSize: 48,
    marginTop: 4,
  },
  celebrationTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#243047',
    textAlign: 'center',
  },
  celebrationMessage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B6EE1',
    textAlign: 'center',
  },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityEmoji: {
    fontSize: 28,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontWeight: '900',
    color: '#243047',
  },
  activityDate: {
    fontSize: 15,
  },
  emptyIcon: {
    fontSize: 34,
  },
});
