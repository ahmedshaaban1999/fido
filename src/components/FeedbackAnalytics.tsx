import React from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Award, Target } from 'lucide-react';
import { FeedbackAnalysis } from '../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  analysis: FeedbackAnalysis;
}

export function FeedbackAnalytics({ analysis }: Props) {
  const skillProgressData = {
    labels: analysis.skillProgress.map(sp => sp.skillId),
    datasets: [
      {
        label: 'Current Score',
        data: analysis.skillProgress.map(sp => sp.currentScore),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Previous Score',
        data: analysis.skillProgress.map(sp => sp.previousScore || 0),
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Feedback Analysis</h2>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span className="text-gray-600">{analysis.period}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Overall Score</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {analysis.overallScore.toFixed(1)}
            {analysis.previousScore && (
              <span className={`text-sm ml-2 ${
                analysis.overallScore > analysis.previousScore
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {analysis.overallScore > analysis.previousScore ? '↑' : '↓'}
                {Math.abs(analysis.overallScore - analysis.previousScore).toFixed(1)}
              </span>
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Top Improvement</h3>
          </div>
          <div className="text-green-600">
            {analysis.skillProgress
              .sort((a, b) => (b.currentScore - (b.previousScore || 0)) - (a.currentScore - (a.previousScore || 0)))
              [0].skillId}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Progress</h3>
        <div className="h-64">
          <Line data={skillProgressData} options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 5
              }
            }
          }} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
        <div className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="mt-1">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}