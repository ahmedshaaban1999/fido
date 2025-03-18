import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, Brain, Mic, MicOff, MessageSquare } from 'lucide-react';
import { Message, Role, CompetencyAreas, FeedbackGrades, LanguageFeedback } from '../types';
import { getCompetencyQuestions, Dummy_getCompetencyQuestions } from '../config/aiConfig';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



interface Props {
  assessorName: string;
  targetName: string;
  targetRole: Role;
  onFeedbackComplete: (feedback: {
    competencyScores: FeedbackGrades;
    strengths: string[];
    improvements: string[];
    summary: string;
    languageFeedback?: LanguageFeedback;
  }) => void;
}

export function FIDOChat({ assessorName, targetName, targetRole, onFeedbackComplete }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentCompetency, setCurrentCompetency] = useState<CompetencyAreas>(CompetencyAreas.LEADERSHIP);
  const [competencyScores, setCompetencyScores] = useState<FeedbackGrades>({
    [CompetencyAreas.LEADERSHIP]: 0,
    [CompetencyAreas.EMOTIONAL_INTELLIGENCE]: 0,
    [CompetencyAreas.COMMUNICATION]: 0,
    [CompetencyAreas.CUSTOMER_EXPERIENCE]: 0,
    [CompetencyAreas.EXECUTION]: 0,
    [CompetencyAreas.INNOVATION]: 0,
    [CompetencyAreas.DIGITAL_FLUENCY]: 0
  });
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [feedbackSummary, setFeedbackSummary] = useState('');
  const [isReviewingFeedback, setIsReviewingFeedback] = useState(false);
  const [languageFeedback, setLanguageFeedback] = useState<LanguageFeedback | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleUserInput(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
      setIsProcessingVoice(true);
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsProcessingVoice(false);
  };

  useEffect(() => {
    scrollToBottom();
    // Initial greeting
    if (messages.length === 0) {
      console.log('Initial greeting');
      addFIDOMessage(
        `Hi ${assessorName}! I'm FIDO, your AI assistant. I'll help you provide feedback for your team. How was work today ?.`,
        undefined,
        CompetencyAreas.LEADERSHIP
      );
    }
    askNextQuestion(messages);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addFIDOMessage = (content: string, options?: string[], competencyArea?: CompetencyAreas, isEnglishFeedback?: boolean) => {
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      type: 'fido',
      content,
      options,
      competencyArea,
      isEnglishFeedback
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      type: 'user',
      content,
      competencyArea: currentCompetency
    }]);
  };

  const readResponse = (text: string): LanguageFeedback => {
    // In a real implementation, this would use AI to analyze language usage
    return {
      vocabulary: ['excellent', 'professional', 'articulate'],
      grammar: ['good sentence structure', 'proper tense usage'],
      pronunciation: ['clear pronunciation', 'good pace'],
      fluency: ['natural flow', 'good rhythm'],
      suggestions: ['practice complex tenses', 'expand business vocabulary'],
      level: 'B2 (Upper Intermediate)'
    };
  };

  const generateFeedbackSummary = () => {
    const summary = Object.entries(competencyScores).map(([area, score]) => {
      return `${area}: ${score}/5`;
    }).join('\n');

    const strengths = ['Communication skills', 'Technical expertise'];
    const improvements = ['Strategic planning', 'Time management'];

    setFeedbackSummary(
      `Feedback Summary for ${targetName}:\n\n${summary}\n\nStrengths:\n- ${strengths.join('\n- ')}\n\nAreas for Improvement:\n- ${improvements.join('\n- ')}`
    );

    return { strengths, improvements };
  };

  const askNextQuestion = async (messages: Message[]) => {
    const Question = await getCompetencyQuestions(messages);
    console.log(Question);
    addFIDOMessage(
      Question,
      undefined,
      currentCompetency
    );
  };

  const handleFeedbackReview = () => {
    const languageAnalysis = readResponse(messages.filter(m => m.type === 'user').map(m => m.content).join(' '));
    setLanguageFeedback(languageAnalysis);

    addFIDOMessage(
      `Based on our discussion, here's the feedback summary for ${targetName}:\n\n${feedbackSummary}\n\nWould you like to make any adjustments to this feedback?`,
      ['Yes, let\'s adjust', 'No, this looks good'],
      undefined,
      true
    );
  };

  const handleUserInput = async (input: string) => {
    addUserMessage(input);
    setUserInput('');
    askNextQuestion(messages);

    if (isReviewingFeedback) {
      if (input.toLowerCase().includes('yes')) {
        addFIDOMessage(
          'Which competency would you like to adjust?',
          Object.values(CompetencyAreas),
          undefined,
          true
        );
      } else {
        // Complete the feedback process
        onFeedbackComplete({
          competencyScores,
          strengths: ['Communication skills', 'Technical expertise'],
          improvements: ['Strategic planning', 'Time management'],
          summary: feedbackSummary,
          languageFeedback: languageFeedback || undefined
        });
      }
      return;
    }

    // Update competency score based on response
    setCompetencyScores(prev => ({
      ...prev,
      [currentCompetency]: Math.min(5, (prev[currentCompetency] || 0) + 1)
    }));

    // Provide language feedback
    // const englishFeedback = readResponse(input);
    // addFIDOMessage(
    //   `Great response! Here's some quick English feedback:\n- Vocabulary: ${englishFeedback.vocabulary[0]}\n- Grammar: ${englishFeedback.grammar[0]}\n\nLet's continue with the next question.`,
    //   undefined,
    //   undefined,
    //   true
    // );

    // Move to next competency or complete
    const competencies = Object.values(CompetencyAreas);
    const currentIndex = competencies.indexOf(currentCompetency);
    
    if (currentIndex < competencies.length - 1) {
      setCurrentCompetency(competencies[currentIndex + 1]);
      //setTimeout(() => askNextQuestion(messages), 1500);
    } else {
      setIsReviewingFeedback(true);
      setTimeout(handleFeedbackReview, 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 border-b">
        <div className="flex items-center gap-3">
          <img
            src="https://raw.githubusercontent.com/yourusername/aivengers360/main/public/fido-logo.png"
            alt="FIDO"
            className="w-12 h-12"
          />
          <div className="text-white">
            <h2 className="font-semibold">FIDO AI Assistant</h2>
            <p className="text-sm opacity-90">Providing feedback for {targetName}</p>
          </div>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${
              message.type === 'user'
                ? 'bg-blue-500 text-white rounded-l-xl rounded-tr-xl'
                : 'bg-gray-100 text-gray-800 rounded-r-xl rounded-tl-xl'
            } p-3`}>
              <p>{message.content}</p>
              {message.competencyArea && (
                <div className="mt-2 text-xs opacity-75">
                  {message.competencyArea}
                </div>
              )}
              {message.options && (
                <div className="mt-2 space-y-2">
                  {message.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleUserInput(option)}
                      className="block w-full text-left px-3 py-2 rounded bg-white hover:bg-blue-50 transition-colors text-gray-800"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {message.isEnglishFeedback && (
                <div className="mt-2 text-xs bg-blue-100 text-blue-800 p-2 rounded">
                  <Sparkles className="w-4 h-4 inline-block mr-1" />
                  English Feedback
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          {browserSupportsSpeechRecognition && (
            <button
              onClick={listening ? stopListening : startListening}
              className={`p-2 rounded-lg ${
                listening 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && userInput.trim()) {
                handleUserInput(userInput.trim());
              }
            }}
            placeholder={listening ? 'Listening...' : 'Type your response...'}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => userInput.trim() && handleUserInput(userInput.trim())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}