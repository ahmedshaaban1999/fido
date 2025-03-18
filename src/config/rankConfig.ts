export const RANKS: UserRank[] = [
  {
    title: 'Rookie',
    minPoints: 0,
    maxPoints: 99,
    icon: '🌱'
  },
  {
    title: 'Champion',
    minPoints: 100,
    maxPoints: 299,
    icon: '🏆'
  },
  {
    title: 'Master',
    minPoints: 300,
    maxPoints: 599,
    icon: '👑'
  },
  {
    title: 'Legend',
    minPoints: 600,
    maxPoints: 999,
    icon: '⭐'
  },
  {
    title: 'Guru',
    minPoints: 1000,
    maxPoints: Infinity,
    icon: '🔮'
  }
];

export const POINTS_CONFIG = {
  FEEDBACK_SUBMISSION: 50,
  DETAILED_FEEDBACK: 20,
  VOICE_FEEDBACK: 30,
  LANGUAGE_PRACTICE: 25,
  WEEKLY_BONUS: 100
};

export const REWARDS: PointsReward[] = [
  {
    id: 'coffee-voucher',
    name: 'Coffee Voucher',
    description: 'Free coffee at the office café',
    pointsCost: 100,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    available: true
  },
  {
    id: 'lunch-voucher',
    name: 'Lunch Voucher',
    description: 'Free lunch at partner restaurants',
    pointsCost: 300,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    available: true
  },
  {
    id: 'day-off',
    name: 'Extra Day Off',
    description: 'One additional paid day off',
    pointsCost: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    available: true
  }
];