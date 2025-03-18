import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Clock, Book, Target, Award } from 'lucide-react';
import { CareerDevelopmentPlan } from '../types';
import { format } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController
);

interface Props {
  plan: CareerDevelopmentPlan;
}

export function CDPAnalytics({ plan }: Props) {
  const progressData = {
    labels: ['Completed', 'In Progress', 'Planned'],
    datasets: [{
      data: [
        plan.analytics.learningProgress.completed,
        plan.analytics.learningProgress.inProgress,
        plan.analytics.learningProgress.planned
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ]
    }]
  };

  const skillGapData = {
    labels: plan.analytics.skillGaps.map(sg => sg.skill),
    datasets: [{
      label: 'Skill Gap',
      data: plan.analytics.skillGaps.map(sg => sg.gap),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    }]
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">CDP Analytics</h2>
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          <span className="text-gray-600">
            Est. Completion: {format(plan.analytics.estimatedCompletion, 'MMM yyyy')}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Progress Rate</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {plan.analytics.progressRate}%
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Book className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-800">Learning Hours</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {plan.skills.reduce((acc, skill) => 
              acc + skill.suggestedCourses.reduce((h, course) => h + course.duration, 0)
            , 0)}h
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Skills in Progress</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {plan.skills.length}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h3>
          <div className="h-64 relative">
            <Doughnut 
              data={progressData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} 
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Skill Gaps</h3>
          <div className="h-64 relative">
            <Line 
              data={skillGapData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                      display: true,
                      text: 'Gap Level'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Courses</h3>
        <div className="space-y-4">
          {plan.skills.flatMap(skill => 
            skill.suggestedCourses.map((course, index) => (
              <div key={`${skill.skillId}-${index}`} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <Book className="w-5 h-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{course.title}</h4>
                  <p className="text-gray-600">{course.provider}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-500">{course.duration}h</span>
                    <span className="text-gray-500">${course.cost}</span>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}