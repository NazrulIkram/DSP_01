export interface EmployeeData {
  age: number;
  overTime: 'Yes' | 'No';
  businessTravel: string;
  jobSatisfaction: number;
  distanceFromHome: number;
}

export const predictAttrition = (data: EmployeeData): { probability: number; level: 'Low' | 'Medium' | 'High' } => {
  let score = 16; // Baseline attrition rate from context

  // Heuristic Logic reflecting common ML feature importance
  // OverTime
  if (data.overTime === 'Yes') score += 25;

  // Age (Younger employees tend to have higher attrition)
  if (data.age < 25) score += 20;
  else if (data.age < 35) score += 10;
  else if (data.age > 50) score -= 10;

  // Job Satisfaction
  if (data.jobSatisfaction === 1) score += 25;
  if (data.jobSatisfaction === 2) score += 15;
  if (data.jobSatisfaction === 4) score -= 10;

  // Distance From Home
  if (data.distanceFromHome > 20) score += 15;
  else if (data.distanceFromHome > 10) score += 5;

  // Business Travel
  if (data.businessTravel === 'Travel_Frequently') score += 15;
  if (data.businessTravel === 'Non-Travel') score -= 5;

  // Randomness factor to simulate model variance
  const variance = Math.random() * 5 - 2.5; 
  score += variance;

  // Clamp score
  const probability = Math.min(Math.max(Math.round(score), 0), 100);

  let level: 'Low' | 'Medium' | 'High' = 'Low';
  if (probability > 60) level = 'High';
  else if (probability > 30) level = 'Medium';

  return { probability, level };
};