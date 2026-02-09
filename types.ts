
export interface Sector {
  id: string;
  name: string;
  regions: string[];
  description: string;
  imageUrl: string;
  placementRate: number;
  averageSalary: string;
  category: 'Skilled' | 'Healthcare' | 'Technical' | 'General';
}

export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  requirements: string[];
  estimatedTimeline: string;
}

export interface CareerRoadmap {
  role: string;
  country: string;
  roadmap: RoadmapStep[];
  generalAdvice: string;
}

export interface Testimonial {
  id: string;
  author: string;
  avatar: string;
  position: string;
  content: string;
}

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Interview' | 'Visa Processing' | 'Accepted' | 'Rejected';

export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  expertise: string;
  experience: number;
  location: string;
  date: string;
  status: ApplicationStatus;
  countryPreference: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  category: string;
}
