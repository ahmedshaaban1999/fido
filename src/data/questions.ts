import { Question } from '../types';

export const questions: Question[] = [
  // DevOps Questions
  {
    id: 'devops_1',
    text: 'How effectively does the individual implement and maintain CI/CD pipelines?',
    category: 'technical',
    applicableRoles: ['DevOps'],
    type: 'rating'
  },
  {
    id: 'devops_2',
    text: 'Assess their ability to troubleshoot complex infrastructure issues:',
    category: 'technical',
    applicableRoles: ['DevOps'],
    type: 'text'
  },
  
  // HR Questions
  {
    id: 'hr_1',
    text: 'How well does the individual handle sensitive employee relations matters?',
    category: 'soft',
    applicableRoles: ['HR'],
    type: 'rating'
  },
  {
    id: 'hr_2',
    text: 'Evaluate their effectiveness in implementing employee engagement initiatives:',
    category: 'soft',
    applicableRoles: ['HR'],
    type: 'text'
  },
  
  // Common Leadership Questions
  {
    id: 'leadership_1',
    text: 'How effectively does the individual delegate tasks and responsibilities?',
    category: 'leadership',
    applicableRoles: ['Manager', 'HR', 'DevOps'],
    type: 'rating'
  },
  
  // Common Soft Skills Questions
  {
    id: 'soft_1',
    text: 'Rate their ability to collaborate with cross-functional teams:',
    category: 'soft',
    applicableRoles: ['Frontend', 'Backend', 'DevOps', 'HR', 'Designer', 'Manager'],
    type: 'rating'
  }
];