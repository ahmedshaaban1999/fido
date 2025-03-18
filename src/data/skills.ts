import { Skill } from '../types';

export const skills: Skill[] = [
  // Technical Skills
  {
    id: 'cloud_architecture',
    name: 'Cloud Architecture',
    category: 'technical',
    description: 'Design and implement cloud infrastructure solutions',
    relevantRoles: ['DevOps', 'Backend']
  },
  {
    id: 'frontend_dev',
    name: 'Frontend Development',
    category: 'technical',
    description: 'Build user interfaces using modern frameworks',
    relevantRoles: ['Frontend', 'Designer']
  },
  // Soft Skills
  {
    id: 'communication',
    name: 'Communication',
    category: 'soft',
    description: 'Effectively convey ideas and information',
    relevantRoles: ['HR', 'Manager', 'Frontend', 'Backend', 'DevOps', 'Designer']
  },
  {
    id: 'conflict_resolution',
    name: 'Conflict Resolution',
    category: 'soft',
    description: 'Address and resolve interpersonal conflicts',
    relevantRoles: ['HR', 'Manager']
  },
  // Leadership Skills
  {
    id: 'team_management',
    name: 'Team Management',
    category: 'leadership',
    description: 'Lead and develop team members effectively',
    relevantRoles: ['Manager', 'HR']
  }
];