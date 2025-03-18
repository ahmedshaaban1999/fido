export type Role = 'HR' | 'DevOps' | 'Frontend' | 'Backend' | 'Manager' | 'Designer';

export type AssessmentType = 'self' | 'peer' | 'leader';

export type SkillCategory = 'technical' | 'soft' | 'leadership';

export enum CompetencyAreas {
  LEADERSHIP = 'Leadership & Management',
  EMOTIONAL_INTELLIGENCE = 'Emotional Intelligence & Professionalism',
  COMMUNICATION = 'Communication & Interpersonal Skills',
  CUSTOMER_EXPERIENCE = 'Customer Experience & Customer Focus',
  EXECUTION = 'Execution & Results Orientation',
  INNOVATION = 'Innovation & Continuous Improvement',
  DIGITAL_FLUENCY = 'Digital Fluency'
}

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  company: string;
  title: string;
  points: number;
  rank: string;
  languageLevel?: {
    english: {
      speaking: number;
      vocabulary: number;
      grammar: number;
      overall: number;
    };
  };
  manager?: {
    id: string;
    name: string;
    title: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  team: string;
  department: string;
  joinDate: Date;
  desiredRole?: Role;
}

export interface FeedbackGrades {
  [CompetencyAreas.LEADERSHIP]: number;
  [CompetencyAreas.EMOTIONAL_INTELLIGENCE]: number;
  [CompetencyAreas.COMMUNICATION]: number;
  [CompetencyAreas.CUSTOMER_EXPERIENCE]: number;
  [CompetencyAreas.EXECUTION]: number;
  [CompetencyAreas.INNOVATION]: number;
  [CompetencyAreas.DIGITAL_FLUENCY]: number;
}

export interface PointsReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  available: boolean;
}

export interface Message {
  id: string;
  type: 'user' | 'fido';
  content: string;
  options?: string[];
  insights?: string;
  competencyArea?: CompetencyAreas;
  isEnglishFeedback?: boolean;
}

export interface UserRank {
  title: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
}

export interface LanguageFeedback {
  vocabulary: string[];
  grammar: string[];
  pronunciation: string[];
  fluency: string[];
  suggestions: string[];
  level: string;
}

export interface WorkItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  type: 'feature' | 'bug' | 'improvement' | 'documentation';
  status: 'in_progress' | 'completed' | 'planned';
  startDate: Date;
  completionDate?: Date;
  complexity: 1 | 2 | 3 | 4 | 5;
  relatedSkills: string[];
  timeSpent?: number; // in hours
  comments?: WorkItemComment[];
}

export interface WorkItemComment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

export interface WorkItemDashboard {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  plannedItems: number;
  averageCompletionTime: number; // in hours
  itemsByStatus: {
    status: WorkItem['status'];
    count: number;
  }[];
  recentItems: WorkItem[];
  timeSpentByType: {
    type: WorkItem['type'];
    hours: number;
  }[];
}

export interface WorkItemAnalysis {
  strongAreas: string[];
  improvementAreas: string[];
  suggestedSkills: string[];
  technicalGrowth: {
    skill: string;
    growth: number;
  }[];
}

export interface Question {
  id: string;
  text: string;
  category: SkillCategory;
  applicableRoles: Role[];
  type: 'rating' | 'text' | 'choice' | 'voice';
  options?: string[];
  competencyArea?: keyof typeof CompetencyAreas;
  weight?: number;
}

export interface Assessment {
  id: string;
  type: AssessmentType;
  targetUserId: string;
  assessorId: string;
  responses: AssessmentResponse[];
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  competencyScores?: {
    [key in CompetencyAreas]: number;
  };
}

export interface AssessmentResponse {
  questionId: string;
  response: string | number;
  aiSuggestion?: string;
  voiceTranscript?: string;
  confidence?: number;
}

export interface FeedbackAnalysis {
  period: string;
  overallScore: number;
  previousScore?: number;
  skillProgress: {
    skillId: string;
    currentScore: number;
    previousScore?: number;
    trend: 'improving' | 'declining' | 'stable';
  }[];
  recommendations: string[];
  competencyBreakdown: {
    [key in CompetencyAreas]: {
      score: number;
      strengths: string[];
      improvements: string[];
    };
  };
}

export interface CareerDevelopmentPlan {
  userId: string;
  targetRole: Role;
  skills: {
    skillId: string;
    currentLevel: number;
    targetLevel: number;
    developmentActions: string[];
    estimatedTimeToAchieve: number; // in weeks
    suggestedCourses: {
      title: string;
      provider: string;
      duration: number; // in hours
      cost: number;
      url: string;
    }[];
  }[];
  timeline: {
    startDate: Date;
    milestones: {
      date: Date;
      description: string;
      status: 'pending' | 'completed';
    }[];
  };
  analytics: {
    progressRate: number; // percentage
    estimatedCompletion: Date;
    skillGaps: {
      skill: string;
      gap: number;
    }[];
    learningProgress: {
      planned: number;
      completed: number;
      inProgress: number;
    };
  };
}