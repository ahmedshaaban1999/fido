import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import type { FeedbackQuestion, FeedbackResponse, FeedbackState } from '../types';
import { ProgressBar } from './ProgressBar';

const questions: FeedbackQuestion[] = [
  {
    id: '1',
    text: 'How would you rate your overall experience?',
    type: 'rating'
  },
  {
    id: '2',
    text: 'What aspect of our service impressed you the most?',
    type: 'choice',
    options: ['User Interface', 'Performance', 'Features', 'Customer Support']
  },
  {
    id: '3',
    text: 'Share your thoughts on how we can improve:',
    type: 'text'
  }
];

const motivationalMessages = [
  "You're doing great! 🌟",
  "Your feedback helps us grow! 🚀",
  "Almost there! Keep going! 💪",
];

export function FeedbackForm() {
  const [state, setState] = useState<FeedbackState>({
    currentQuestionIndex: 0,
    responses: [],
    isComplete: false
  });

  const currentQuestion = questions[state.currentQuestionIndex];

  const handleResponse = (answer: string | number) => {
    setState(prev => ({
      ...prev,
      responses: [...prev.responses, { questionId: currentQuestion.id, answer }],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      isComplete: prev.currentQuestionIndex === questions.length - 1
    }));
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'rating':
        return (
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleResponse(rating)}
                className="p-2 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-8 h-8 ${
                    rating <= (state.responses.find(r => r.questionId === currentQuestion.id)?.answer as number || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        );
      
      case 'choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option}
                onClick={() => handleResponse(option)}
                className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <div className="w-full">
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="Type your answer here..."
              onChange={(e) => handleResponse(e.target.value)}
            />
          </div>
        );
    }
  };

  if (state.isComplete) {
    return (
      <div className="text-center space-y-4">
        <ThumbsUp className="w-16 h-16 mx-auto text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800">Thank you for your feedback!</h2>
        <p className="text-gray-600">Your input helps us improve our service.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <ProgressBar 
        current={state.currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentQuestion.text}
        </h2>
        
        {renderQuestion()}
      </div>

      <p className="text-center text-gray-600 italic mt-6">
        {motivationalMessages[state.currentQuestionIndex % motivationalMessages.length]}
      </p>
    </div>
  );
}