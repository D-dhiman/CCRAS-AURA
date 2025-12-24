// Mock data for the Doctor PWA

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  primaryCondition: string;
  currentStage: 'Acute' | 'Post-operation' | 'Recovery' | 'Chronic' | 'Stable';
  lastVisit: string;
  phone?: string;
  avatar?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    duration: string;
  }[];
  advice: string;
  notes?: string;
}

export interface WellnessConsideration {
  category: 'meditation' | 'breathing' | 'lifestyle' | 'avoid';
  title: string;
  description: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  experience: string;
  avatar?: string;
}

export const currentDoctor: Doctor = {
  id: 'doc-001',
  name: 'Dr. Arjun Sharma',
  specialization: 'Ayurveda & Wellness',
  email: 'dr.arjun@ayucare.com',
  phone: '+91 98765 43210',
  experience: '12 years',
};

export const patients: Patient[] = [
  {
    id: 'pat-001',
    name: 'Priya Menon',
    age: 34,
    gender: 'Female',
    bloodGroup: 'B+',
    primaryCondition: 'Chronic Digestive Issues',
    currentStage: 'Recovery',
    lastVisit: '2024-12-20',
  },
  {
    id: 'pat-002',
    name: 'Rahul Verma',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    primaryCondition: 'Post-surgery Recovery (Knee)',
    currentStage: 'Post-operation',
    lastVisit: '2024-12-22',
  },
  {
    id: 'pat-003',
    name: 'Anita Desai',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    primaryCondition: 'Stress & Anxiety',
    currentStage: 'Stable',
    lastVisit: '2024-12-18',
  },
  {
    id: 'pat-004',
    name: 'Vikram Singh',
    age: 52,
    gender: 'Male',
    bloodGroup: 'AB-',
    primaryCondition: 'Diabetes Management',
    currentStage: 'Chronic',
    lastVisit: '2024-12-15',
  },
  {
    id: 'pat-005',
    name: 'Meera Krishnan',
    age: 39,
    gender: 'Female',
    bloodGroup: 'O-',
    primaryCondition: 'Migraine',
    currentStage: 'Acute',
    lastVisit: '2024-12-23',
  },
];

export const patientRecords: Record<string, MedicalRecord[]> = {
  'pat-001': [
    {
      id: 'rec-001',
      date: '2024-12-20',
      doctorName: 'Dr. Arjun Sharma',
      diagnosis: 'Gastritis with IBS symptoms',
      medicines: [
        { name: 'Triphala Churna', dosage: '5g', duration: '30 days' },
        { name: 'Avipattikar Churna', dosage: '3g after meals', duration: '15 days' },
      ],
      advice: 'Avoid spicy and fried foods. Include warm water with cumin in morning. Practice mindful eating.',
      notes: 'Patient showing improvement. Continue treatment.',
    },
    {
      id: 'rec-002',
      date: '2024-11-15',
      doctorName: 'Dr. Arjun Sharma',
      diagnosis: 'Initial consultation - Digestive disorders',
      medicines: [
        { name: 'Hingvastak Churna', dosage: '3g before meals', duration: '15 days' },
      ],
      advice: 'Maintain food diary. Avoid dairy temporarily.',
    },
  ],
  'pat-002': [
    {
      id: 'rec-003',
      date: '2024-12-22',
      doctorName: 'Dr. Arjun Sharma',
      diagnosis: 'Post-operative care - Day 5',
      medicines: [
        { name: 'Ashwagandha', dosage: '500mg twice daily', duration: '60 days' },
        { name: 'Yograj Guggulu', dosage: '2 tablets twice daily', duration: '30 days' },
      ],
      advice: 'Gentle knee exercises as prescribed. Apply warm sesame oil massage around (not on) the operated area.',
      notes: 'Healing well. No signs of infection.',
    },
  ],
  'pat-003': [
    {
      id: 'rec-004',
      date: '2024-12-18',
      doctorName: 'Dr. Arjun Sharma',
      diagnosis: 'Anxiety with sleep disturbance',
      medicines: [
        { name: 'Brahmi Vati', dosage: '2 tablets at bedtime', duration: '45 days' },
        { name: 'Shankhpushpi Syrup', dosage: '10ml twice daily', duration: '30 days' },
      ],
      advice: 'Practice 10 minutes pranayama daily. Avoid screens 1 hour before bed. Chamomile tea recommended.',
    },
  ],
};

export const wellnessConsiderations: Record<string, WellnessConsideration[]> = {
  'pat-001': [
    {
      category: 'breathing',
      title: 'Deep Belly Breathing',
      description: 'Practice 5 minutes before meals to aid digestion.',
      icon: 'wind',
    },
    {
      category: 'lifestyle',
      title: 'Meal Timing',
      description: 'Eat largest meal at lunch when digestive fire is strongest.',
      icon: 'sun',
    },
    {
      category: 'avoid',
      title: 'Avoid Cold Drinks',
      description: 'Cold beverages weaken digestive fire (agni).',
      icon: 'alert-triangle',
    },
  ],
  'pat-002': [
    {
      category: 'meditation',
      title: 'Gentle Body Scan',
      description: 'Daily 10-minute body awareness meditation for healing.',
      icon: 'brain',
    },
    {
      category: 'avoid',
      title: 'No Strenuous Activity',
      description: 'Avoid bending, lifting, or putting weight on operated knee for 6 weeks.',
      icon: 'alert-triangle',
    },
    {
      category: 'avoid',
      title: 'No Swimming/Bathing',
      description: 'Keep surgical site dry until cleared by surgeon.',
      icon: 'droplets',
    },
    {
      category: 'lifestyle',
      title: 'Protein-Rich Diet',
      description: 'Include dal, paneer, and nuts for tissue healing.',
      icon: 'utensils',
    },
  ],
  'pat-003': [
    {
      category: 'meditation',
      title: 'Mindfulness Practice',
      description: '15 minutes daily guided meditation recommended.',
      icon: 'brain',
    },
    {
      category: 'breathing',
      title: 'Alternate Nostril Breathing',
      description: 'Practice Nadi Shodhana for 5 minutes morning and evening.',
      icon: 'wind',
    },
    {
      category: 'lifestyle',
      title: 'Nature Walks',
      description: 'Spend 20 minutes daily in natural surroundings.',
      icon: 'trees',
    },
  ],
};

export const dashboardStats = {
  patientsToday: 8,
  followUpsPending: 5,
  recentAppointments: 12,
};
