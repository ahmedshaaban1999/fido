import React, { useState } from 'react';
import { AssessmentForm } from './components/AssessmentForm';
import { CareerDevelopmentPlan } from './components/CareerDevelopmentPlan';
import { WorkItemLogger } from './components/WorkItemLogger';
import { FeedbackAnalytics } from './components/FeedbackAnalytics';
import { CDPAnalytics } from './components/CDPAnalytics';
import { FIDOChat } from './components/FIDOChat';
import { FeedbackDashboard } from './components/FeedbackDashboard';
import { UserProfile } from './components/UserProfile';
import { questions } from './data/questions';
import { Role, Assessment, CareerDevelopmentPlan as CDP, UserProfile as UserProfileType } from './types';
import { Bot, Sparkles, BarChart3, BookOpen, Target, User } from 'lucide-react';

// Demo data
const demoUser: UserProfileType = {
  id: '1',
  name: 'John Doe',
  role: 'DevOps' as Role,
  company: 'AIVengers',
  title: 'Senior DevOps Engineer',
  manager: {
    id: 'mgr1',
    name: 'Sarah Johnson',
    title: 'Engineering Director'
  },
  contact: {
    email: 'john.doe@aivengers.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue, Innovation District, CA 94105'
  },
  team: 'Platform',
  department: 'Engineering',
  joinDate: new Date('2023-01-15'),
  desiredRole: 'Manager' as Role,
  points: 1200,
  rank: 'Gold'
};

const targetUser = {
  id: '2',
  name: 'Ahmed Khan',
  role: 'Frontend' as Role,
  team: 'Platform',
};

const demoPlan: CDP = {
  userId: '1',
  targetRole: 'Manager',
  skills: [
    {
      skillId: 'team_management',
      currentLevel: 2,
      targetLevel: 4,
      developmentActions: [
        'Complete Leadership Fundamentals course',
        'Lead a cross-functional project team',
        'Mentor junior team members'
      ],
      estimatedTimeToAchieve: 12,
      suggestedCourses: [
        {
          title: 'Leadership Fundamentals',
          provider: 'Coursera',
          duration: 20,
          cost: 99,
          url: 'https://coursera.org/leadership'
        },
        {
          title: 'Team Management Essentials',
          provider: 'Udemy',
          duration: 15,
          cost: 79,
          url: 'https://udemy.com/team-management'
        }
      ]
    },
    {
      skillId: 'communication',
      currentLevel: 3,
      targetLevel: 5,
      developmentActions: [
        'Present at team meetings regularly',
        'Write technical documentation',
        'Facilitate team retrospectives'
      ],
      estimatedTimeToAchieve: 8,
      suggestedCourses: [
        {
          title: 'Business Communication',
          provider: 'LinkedIn Learning',
          duration: 10,
          cost: 49,
          url: 'https://linkedin-learning.com/communication'
        }
      ]
    }
  ],
  timeline: {
    startDate: new Date(),
    milestones: [
      {
        date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        description: 'Complete Leadership Training',
        status: 'pending'
      },
      {
        date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        description: 'Lead First Project Team',
        status: 'pending'
      }
    ]
  },
  analytics: {
    progressRate: 35,
    estimatedCompletion: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    skillGaps: [
      { skill: 'Leadership', gap: 2 },
      { skill: 'Communication', gap: 1.5 },
      { skill: 'Strategic Planning', gap: 2.5 }
    ],
    learningProgress: {
      planned: 8,
      inProgress: 3,
      completed: 2
    }
  }
};

function App() {
  const [activeView, setActiveView] = useState<'home' | 'profile' | 'assessment' | 'cdp' | 'workitem' | 'analytics' | 'feedback'>('home');
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [selectedPeer, setSelectedPeer] = useState<string | null>(null);
  const [showFIDOChat, setShowFIDOChat] = useState(false);

  const roleSpecificQuestions = questions.filter(q => 
    q.applicableRoles.includes(demoUser.role)
  );

  const handleAssessmentSubmit = (responses: any) => {
    console.log('Assessment submitted:', responses);
    setActiveAssessment(null);
    setActiveView('home');
  };

  const handleFeedbackComplete = (feedback: any) => {
    console.log('Feedback completed:', feedback);
    setActiveView('home');
  };

  const handleStartSelfAssessment = () => {
    setActiveAssessment({
      id: 'assessment1',
      type: 'self',
      targetUserId: demoUser.id,
      assessorId: demoUser.id,
      responses: [],
      status: 'in_progress',
      createdAt: new Date()
    });
    setActiveView('assessment');
  };

  const handleStartPeerFeedback = (targetId: string) => {
    setSelectedPeer(targetId);
  };

  const handleViewReceivedFeedback = (feedbackId: string) => {
    setActiveView('analytics');
  };

  const handleWorkItemSubmit = (workItem: any) => {
    const storageKey = `workItems_${demoUser.id}`;
    const existingItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const updatedItems = [...existingItems, { ...workItem, timestamp: new Date().toISOString() }];
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setActiveView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/yourusername/aivengers360/main/public/fido-logo.png" 
                alt="FIDO" 
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                AIVengers360
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveView('home')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => setActiveView('profile')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Profile
              </button>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-600">{demoUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeView === 'profile' && (
          <UserProfile profile={demoUser} />
        )}

        {activeView === 'home' && (
          <div className="space-y-8">
            <button
              onClick={() => setShowFIDOChat(true)}
              className="w-full bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Meet FIDO</h2>
                  <p className="text-gray-600">Your Friendly Interactive Digital Organizer</p>
                </div>
              </div>
              <p className="text-gray-700">
                Hi {demoUser.name}! 👋 I'm here to help you grow and succeed in your career journey. 
                Let's explore your skills and create a personalized development plan together!
              </p>
            </button>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => setActiveView('feedback')}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-orange-100 hover:border-orange-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">360° Feedback</h3>
                </div>
                <p className="text-gray-600 text-left">Start your feedback journey with AI-guided assessments</p>
              </button>

              <button
                onClick={() => setActiveView('cdp')}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-orange-100 hover:border-orange-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Career Development</h3>
                </div>
                <p className="text-gray-600 text-left">View your personalized growth path and learning resources</p>
              </button>

              <button
                onClick={() => setActiveView('workitem')}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-orange-100 hover:border-orange-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Work Items</h3>
                </div>
                <p className="text-gray-600 text-left">Log your achievements and get AI-powered insights</p>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Your Growth Summary</h3>
                </div>
                <button
                  onClick={() => setActiveView('analytics')}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  View Details →
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Skills in Progress</h4>
                  <p className="text-2xl font-bold text-orange-600">5</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Completed Milestones</h4>
                  <p className="text-2xl font-bold text-orange-600">8</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Growth Score</h4>
                  <p className="text-2xl font-bold text-orange-600">85%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'feedback' && (
          <FeedbackDashboard
            userId={demoUser.id}
            userName={demoUser.name}
            role={demoUser.role}
            onStartSelfAssessment={handleStartSelfAssessment}
            onStartPeerFeedback={handleStartPeerFeedback}
            onViewReceivedFeedback={handleViewReceivedFeedback}
          />
        )}

        {(showFIDOChat) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-t-xl sm:rounded-xl shadow-lg">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowFIDOChat(false);
                    if (activeView === 'chat') setActiveView('home');
                  }}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                <FIDOChat
                  assessorName={demoUser.name}
                  targetName={selectedPeer === '1' ? 'Sarah Chen' : 'Ahmed Khan'}
                  targetRole={targetUser.role}
                  onFeedbackComplete={handleFeedbackComplete}
                />
              </div>
            </div>
          </div>
        )}

        {activeView === 'assessment' && (
          <AssessmentForm
            questions={roleSpecificQuestions}
            type={activeAssessment?.type || 'self'}
            targetRole={demoUser.role}
            onSubmit={handleAssessmentSubmit}
          />
        )}

        {activeView === 'cdp' && (
          <div className="space-y-8">
            <CareerDevelopmentPlan
              plan={demoPlan}
              currentRole={demoUser.role}
            />
            <CDPAnalytics plan={demoPlan} />
          </div>
        )}

        {activeView === 'workitem' && (
          <WorkItemLogger
            userId={demoUser.id}
            role={demoUser.role}
            onSubmit={handleWorkItemSubmit}
          />
        )}

        {activeView === 'analytics' && (
          <FeedbackAnalytics
            analysis={{
              period: 'Q1 2024',
              overallScore: 4.2,
              previousScore: 3.8,
              skillProgress: [
                { skillId: 'Communication', currentScore: 4.5, previousScore: 4.0, trend: 'improving' },
                { skillId: 'Technical Skills', currentScore: 4.0, previousScore: 3.5, trend: 'improving' },
                { skillId: 'Leadership', currentScore: 3.8, previousScore: 3.5, trend: 'improving' }
              ],
              recommendations: [
                'Continue focusing on technical documentation',
                'Take on more team leadership opportunities',
                'Share knowledge through team presentations'
              ]
            }}
          />
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">© 2024 AIVengers360. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600">Powered by FIDO AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;