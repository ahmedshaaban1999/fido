import {Groq} from 'groq-sdk'
import { Message } from '../types';

export const AI_CONFIG = {
  MODEL_API_URL: import.meta.env.VITE_AI_MODEL_URL || 'https://api.aimodel.example.com',
  MODEL_API_KEY: import.meta.env.VITE_AI_MODEL_KEY || '',
  
  COMPETENCY_WEIGHTS: {
    LEADERSHIP: 0.2,
    EMOTIONAL_INTELLIGENCE: 0.2,
    COMMUNICATION: 0.15,
    CUSTOMER_EXPERIENCE: 0.15,
    EXECUTION: 0.15,
    INNOVATION: 0.1,
    DIGITAL_FLUENCY: 0.05
  },
  
  MIN_QUESTIONS_PER_CATEGORY: 3,
  CONFIDENCE_THRESHOLD: 0.8,
  
  SPEECH_RECOGNITION: {
    language: 'en-US',
    continuous: true,
    interimResults: true
  }
};

export const getCompetencyQuestions = async (messages:Message[]) => {
  try {
    const groq = new Groq({
      apiKey: AI_CONFIG.MODEL_API_KEY,
      dangerouslyAllowBrowser: true
    });
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a competency assessment expert. You are helping John doe in providing feedback on his team members. John doe is a senior frontend engineer. His team members are Michael Brown , a senior frontend engineer, and Sarah Chen, a junior QA engineer. Generate relevant questions one by one based on the provided answers. Ask maximum 10 questions before summarizing the feedback and sending it back"
        },
        {
          role: "user",
          content: JSON.stringify(messages)
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Failed to generate competency questions:', error);
    throw error;
  }
};

export const Dummy_getCompetencyQuestions = async (messages:Message[]) => {
  return "dummy text"
};

export const AI_RESPONSE_TEMPLATES = {
  CATEGORY_SUMMARY: "[name]'s performance in [category] demonstrates [level] proficiency. Based on our discussion, they excel in [strengths] while having opportunities for growth in [improvements]. The overall rating for this category is [score]%. Would you agree with this assessment?",
  IMPROVEMENT_SUGGESTION: "To enhance [name]'s capabilities in [area], consider focusing on: [suggestions]",
  FINAL_SUMMARY: "Based on our comprehensive discussion across all competencies, [name] shows particular strength in [top_areas] with an overall rating of [total_score]%. The key areas for development are [development_areas]. Would you like to review any specific category in more detail?"
};