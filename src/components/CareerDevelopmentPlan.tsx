import React from 'react';
import { Trophy, Target, ArrowUpRight } from 'lucide-react';
import { CareerDevelopmentPlan as CDP, Role, Skill } from '../types';
import { skills } from '../data/skills';

interface Props {
  plan: CDP;
  currentRole: Role;
}

export function CareerDevelopmentPlan({ plan, currentRole }: Props) {
  const getSkillById = (id: string): Skill | undefined => {
    return skills.find(skill => skill.id === id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Career Development Plan</h2>
          <p className="text-gray-600">
            {currentRole} → {plan.targetRole}
          </p>
        </div>
        <Target className="w-8 h-8 text-blue-600" />
      </div>

      <div className="grid gap-6 mb-8">
        {plan.skills.map(skill => {
          const skillInfo = getSkillById(skill.skillId);
          return (
            <div key={skill.skillId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{skillInfo?.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Level {skill.currentLevel}</span>
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Level {skill.targetLevel}</span>
                </div>
              </div>

              <div className="space-y-2">
                {skill.developmentActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline & Milestones</h3>
        <div className="space-y-4">
          {plan.timeline.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div>
                <p className="text-gray-700">{milestone.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(milestone.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}