import React from 'react';
import { UserCircle2, Users, ClipboardCheck, MessageSquare, ArrowRight } from 'lucide-react';
import { Role, Assessment } from '../types';

interface Props {
  userId: string;
  userName: string;
  role: Role;
  onStartSelfAssessment: () => void;
  onStartPeerFeedback: (targetId: string) => void;
  onViewReceivedFeedback: (feedbackId: string) => void;
}

// Demo data - In a real app, this would come from an API
const pendingFeedbacks = [
  {
    id: '1',
    targetName: 'Sarah Chen',
    targetRole: 'Frontend' as Role,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending'
  },
  {
    id: '2',
    targetName: 'Michael Brown',
    targetRole: 'Backend' as Role,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'pending'
  }
];

const receivedFeedbacks = [
  {
    id: '1',
    from: 'Team Lead',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    rating: 4.5,
    status: 'unread'
  },
  {
    id: '2',
    from: 'Peer Review',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    rating: 4.2,
    status: 'read'
  }
];

export function FeedbackDashboard({ 
  userId, 
  userName, 
  role,
  onStartSelfAssessment,
  onStartPeerFeedback,
  onViewReceivedFeedback
}: Props) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">360° Feedback Dashboard</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Self Assessment */}
          <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCircle2 className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Self Assessment</h3>
                <p className="text-sm text-gray-600">Reflect on your progress</p>
              </div>
            </div>
            <button
              onClick={onStartSelfAssessment}
              className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              Start Self Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pending Peer Feedback */}
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Peer Feedback</h3>
                <p className="text-sm text-gray-600">{pendingFeedbacks.length} pending reviews</p>
              </div>
            </div>
            <div className="space-y-3">
              {pendingFeedbacks.map(feedback => (
                <button
                  key={feedback.id}
                  onClick={() => onStartPeerFeedback(feedback.id)}
                  className="w-full p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{feedback.targetName}</p>
                      <p className="text-sm text-gray-600">{feedback.targetRole}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {feedback.dueDate.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Received Feedback */}
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Received Feedback</h3>
                <p className="text-sm text-gray-600">{receivedFeedbacks.length} feedbacks</p>
              </div>
            </div>
            <div className="space-y-3">
              {receivedFeedbacks.map(feedback => (
                <button
                  key={feedback.id}
                  onClick={() => onViewReceivedFeedback(feedback.id)}
                  className="w-full p-3 bg-white rounded-lg hover:bg-green-50 transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{feedback.from}</p>
                        {feedback.status === 'unread' && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Rating: {feedback.rating}/5</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Received: {feedback.date.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <ClipboardCheck className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p>New feedback received from Team Lead</p>
            <span className="text-sm text-gray-400">2 days ago</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <p>Completed self assessment</p>
            <span className="text-sm text-gray-400">1 week ago</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <p>Provided feedback for Sarah Chen</p>
            <span className="text-sm text-gray-400">2 weeks ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}