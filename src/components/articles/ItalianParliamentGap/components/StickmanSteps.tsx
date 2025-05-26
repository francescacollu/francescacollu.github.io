type StickmanCategory = { id: string; label: string; value: number; color: string; };
type StickmanStep = { categories: StickmanCategory[]; };

const genderStickmanSteps: StickmanStep[] = [
  {
    categories: [
      { id: 'all', label: 'All', value: 605, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'female_pop', label: 'FemalePop', value: 308, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 297, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'female_parliament', label: 'FemaleParliament', value: 206, color: '#FFD700' },
      { id: 'rest_parliament', label: 'RestParliament', value: 399, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'female_parliament', label: 'FemaleParliament', value: 206, color: '#FFD700' },
      { id: 'female_pop', label: 'FemalePop', value: 102, color: '#4169E1' },
      { id: 'rest_parliament', label: 'RestParliament', value: 399, color: 'grey' }
    ]
  }
  // ...add more steps as needed
];


const ageStickmanSteps: StickmanStep[] = [
  {
    categories: [
      { id: 'all', label: 'All', value: 605, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'very_young_pop', label: 'VeryYoungPop', value: 136, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 469, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'young_pop', label: 'YoungPop', value: 65, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 540, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'young_parliament', label: 'YoungParliament', value: 9, color: '#FFD700' },
      { id: 'young_pop', label: 'YoungPop', value: 56, color: '#4169E1' },
      { id: 'rest_parliament', label: 'RestParliament', value: 540, color: 'grey' }
    ]
  }
  // ...add more steps as needed
];

const educationStickmanSteps: StickmanStep[] = [
  {
    categories: [
      { id: 'all', label: 'All', value: 605, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'graduate_pop', label: 'GraduatePop', value: 131, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 474, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'graduate_parliament', label: 'GraduateParliament', value: 464, color: '#FFD700' },
      { id: 'rest_parliament', label: 'RestParliament', value: 141, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'law_degree_pop', label: 'LawDegreePop', value: 36, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 569, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'law_degree_parliament', label: 'LawDegreeParliament', value: 183, color: '#FFD700' },
      { id: 'rest_parliament', label: 'RestParliament', value: 422, color: 'grey' }
    ]
  }
  // ...add more steps as needed
];

const foreignStickmanSteps: StickmanStep[] = [
  {
    categories: [
      { id: 'all', label: 'All', value: 605, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'foreign_pop', label: 'ForeignPop', value: 61, color: '#4169E1' },
      { id: 'rest_pop', label: 'RestPop', value: 544, color: 'grey' }
    ]
  },
  {
    categories: [
      { id: 'foreign_parliament', label: 'ForeignParliament', value: 13, color: '#FFD700' },
      { id: 'foreign_pop', label: 'ForeignPop', value: 48, color: '#4169E1' },
      { id: 'rest_parliament', label: 'RestParliament', value: 544, color: 'grey' }
    ]
  }
];
export { genderStickmanSteps, ageStickmanSteps, educationStickmanSteps, foreignStickmanSteps };


