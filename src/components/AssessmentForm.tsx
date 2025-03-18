import React, { useState } from 'react';
import { MessageSquareText, Lightbulb, Send } from 'lucide-react';
import { Question, AssessmentType, Role, AssessmentResponse } from '../types';
import { getAIFeedbackSuggestion } from '../services/aiService';

interface Props {
  questions: Question[];
  type: AssessmentType;
  targetRole: Role;
  onSubmit: (responses: AssessmentResponse[]) => void;
}

export function AssessmentForm({ questions, type, targetRole, onSubmit }: Props) {
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAIAssist = async () => {
    setIsTyping(true);
    const suggestion = await getAIFeedbackSuggestion(
      targetRole,
      currentQuestion.text,
      responses[currentIndex]?.response?.toString() || ''
    );
    setAiSuggestion(suggestion.feedback);
    setIsTyping(false);
  };

  const handleResponse = (response: string | number) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = {
      questionId: currentQuestion.id,
      response,
      aiSuggestion
    };
    setResponses(newResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAiSuggestion('');
    } else {
      onSubmit(newResponses);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {type === 'self' ? 'Self Assessment' : type === 'peer' ? 'Peer Review' : 'Leadership Assessment'}
        </h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg text-gray-700">{currentQuestion.text}</h3>
        
        {currentQuestion.type === 'rating' && (
          <div className="flex gap-4 justify-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleResponse(rating)}
                className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-blue-500 
                         flex items-center justify-center text-lg font-medium
                         hover:bg-blue-50 transition-colors"
              >
                {rating}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'text' && (
          <div className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 
                       focus:ring-1 focus:ring-blue-500 min-h-[120px]"
              placeholder="Type your feedback here..."
              onChange={(e) => handleResponse(e.target.value)}
            />
            
            <div className="flex gap-2">
              <button
                onClick={handleAIAssist}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 
                         rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                AI Assist
              </button>
              
              <button
                onClick={() => handleResponse(responses[currentIndex]?.response || '')}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 
                         rounded-lg hover:bg-blue-700 transition-colors ml-auto"
              >
                <Send className="w-4 h-4" />
                Next
              </button>
            </div>

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <MessageSquareText className="w-4 h-4 animate-pulse" />
                AI is typing...
              </div>
            )}

            {aiSuggestion && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{aiSuggestion}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}