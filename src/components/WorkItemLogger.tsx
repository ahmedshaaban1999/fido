import React, { useState } from 'react';
import { Clock, BookOpen, Send, Brain } from 'lucide-react';
import { WorkItem, Role } from '../types';
import { analyzeWorkItem } from '../services/aiService';

interface Props {
  userId: string;
  role: Role;
  onSubmit: (workItem: WorkItem) => void;
}

export function WorkItemLogger({ userId, role, onSubmit }: Props) {
  const [workItem, setWorkItem] = useState<Partial<WorkItem>>({
    userId,
    type: 'feature',
    status: 'in_progress',
    complexity: 3,
    technologies: [],
    relatedSkills: []
  });
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTechnologyAdd = (tech: string) => {
    setWorkItem(prev => ({
      ...prev,
      technologies: [...(prev.technologies || []), tech]
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeWorkItem(workItem, role);
    setAnalysis(result.insights);
    setWorkItem(prev => ({
      ...prev,
      relatedSkills: result.suggestedSkills
    }));
    setIsAnalyzing(false);
  };

  const handleSubmit = () => {
    if (workItem.title && workItem.description) {
      onSubmit({
        ...workItem as WorkItem,
        id: crypto.randomUUID(),
        startDate: new Date()
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Log Work Item</h2>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Track your progress</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={workItem.title || ''}
            onChange={e => setWorkItem(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={workItem.description || ''}
            onChange={e => setWorkItem(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={workItem.type}
              onChange={e => setWorkItem(prev => ({ ...prev, type: e.target.value as WorkItem['type'] }))}
            >
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
              <option value="improvement">Improvement</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complexity
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    workItem.complexity === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setWorkItem(prev => ({ ...prev, complexity: level as WorkItem['complexity'] }))}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Technologies Used
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {workItem.technologies?.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add technology (press Enter)"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                handleTechnologyAdd(input.value);
                input.value = '';
              }
            }}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAnalyze}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isAnalyzing}
          >
            <Brain className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>

        {analysis && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-blue-800">AI Analysis</h3>
            </div>
            <p className="text-blue-800">{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}