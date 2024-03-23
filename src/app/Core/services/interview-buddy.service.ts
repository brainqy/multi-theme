import { Injectable } from '@angular/core';
export interface Candidate {
  name: string;
  skills: string[]; // Array of skills
  experience: number;
  timeSlots: { time: string; available: boolean }[]; // Years of experience
}
@Injectable({
  providedIn: 'root'
})
export class InterviewBuddyService {
  private candidates: Candidate[] = [
    { 
      name: 'Mohammed Khan',
      skills: ['Angular', 'React', 'Node.js', 'Express.js'],
      experience: 4,
      timeSlots: [
        { time: 'Monday 9:00 AM', available: true },
        { time: 'Tuesday 1:00 PM', available: false },
        { time: 'Wednesday 10:00 AM', available: true }
      ]
    },
    { 
      name: 'Ayaan Sharma',
      skills: ['Python', 'Django', 'Flask', 'PostgreSQL'],
      experience: 3,
      timeSlots: [
        { time: 'Thursday 11:00 AM', available: true },
        { time: 'Friday 2:00 PM', available: true },
        { time: 'Saturday 12:00 PM', available: false }
      ]
    },
    { 
      name: 'Advik Singh',
      skills: ['C#', 'ASP.NET', 'MVC', 'Entity Framework'],
      experience: 6,
      timeSlots: [
        { time: 'Monday 2:00 PM', available: false },
        { time: 'Wednesday 9:00 AM', available: true },
        { time: 'Friday 3:00 PM', available: true }
      ]
    },
    { 
      name: 'Arjun Gupta',
      skills: ['JavaScript', 'React', 'Vue.js', 'MongoDB'],
      experience: 2,
      timeSlots: [
        { time: 'Tuesday 10:00 AM', available: true },
        { time: 'Thursday 2:00 PM', available: false },
        { time: 'Saturday 11:00 AM', available: true }
      ]
    },
    { 
      name: 'Vivaan Reddy',
      skills: ['Java', 'Spring', 'Hibernate', 'MySQL'],
      experience: 4,
      timeSlots: [
        { time: 'Monday 1:00 PM', available: true },
        { time: 'Wednesday 10:00 AM', available: true },
        { time: 'Friday 4:00 PM', available: true }
      ]
    },
    { 
      name: 'Reyansh Agarwal',
      skills: ['Python', 'Django', 'Flask', 'MongoDB'],
      experience: 3,
      timeSlots: [
        { time: 'Tuesday 11:00 AM', available: true },
        { time: 'Thursday 3:00 PM', available: true },
        { time: 'Saturday 2:00 PM', available: true }
      ]
    },
    { 
      name: 'Ishaan Mishra',
      skills: ['JavaScript', 'Angular', 'React', 'Vue.js'],
      experience: 5,
      timeSlots: [
        { time: 'Monday 10:00 AM', available: false },
        { time: 'Wednesday 3:00 PM', available: true },
        { time: 'Friday 11:00 AM', available: true }
      ]
    },
    { 
      name: 'Sai Patel',
      skills: ['C#', '.NET Core', 'MVC', 'SQL Server'],
      experience: 4,
      timeSlots: [
        { time: 'Tuesday 1:00 PM', available: true },
        { time: 'Thursday 9:00 AM', available: true },
        { time: 'Saturday 10:00 AM', available: false }
      ]
    },
    // Add more candidates here
  ];
  
  

  constructor() {}

  findBuddy(userSkillSet: string[], userExperience: number): Candidate | null {
    let bestMatch: { candidate: Candidate; similarity: number } | null = null;
    for (const candidate of this.candidates) {
      const similarity = this.calculateSimilarity(candidate.skills, userSkillSet, candidate.experience, userExperience);
      if (!bestMatch || similarity > bestMatch.similarity) {
        bestMatch = { candidate, similarity };
      }
    }
    return bestMatch ? bestMatch.candidate : null;
  }

  private calculateSimilarity(candidateSkills: string[], userSkillSet: string[], candidateExperience: number, userExperience: number): number {
    const skillIntersection = candidateSkills.filter(skill => userSkillSet.includes(skill));
    const skillUnion = [...new Set([...candidateSkills, ...userSkillSet])];
    const skillSimilarity = skillIntersection.length / skillUnion.length;

    // Normalize experience difference to range [0, 1]
    const maxExperienceDifference = 10; // Example: maximum experience difference considered
    const normalizedExperienceDifference = Math.min(Math.abs(candidateExperience - userExperience) / maxExperienceDifference, 1);

    // Combine skill similarity and experience similarity (adjust weights as needed)
    const skillWeight = 0.7; // Weight for skill similarity
    const experienceWeight = 0.3; // Weight for experience similarity
    return (skillWeight * skillSimilarity) + (experienceWeight * (1 - normalizedExperienceDifference));
  }
}
