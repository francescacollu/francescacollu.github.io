import { Category } from "./MathUtils";


type ChartStep = { categories: Category[]; };

const genderChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'FemalePop', count: 308, color: '#4169e1' },
      { label: 'RestPop', count: 297, color: '#666666' }
    ]
  },
  {
    categories: [
      { label: 'FemaleParliament', count: 206, color: '#ffd700' },
      { label: 'RestParliament', count: 399, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'FemaleParliament', count: 206, color: '#ffd700' },
      { label: 'FemalePop', count: 102, color: '#4169e1' },
      { label: 'RestParliament', count: 399, color: '#888888' }
    ]
  }
  // ...add more steps as needed
];


const ageChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'VeryYoungPop', count: 136, color: '#4169e1' },
      { label: 'RestPop', count: 469, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'YoungPop', count: 65, color: '#4169e1' },
      { label: 'RestPop', count: 540, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'YoungParliament', count: 9, color: '#ffd700' },
      { label: 'YoungPop', count: 56, color: '#4169e1' },
      { label: 'RestParliament', count: 540, color: '#888888' }
    ]
  }
  // ...add more steps as needed
];

const educationChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'GraduatePop', count: 131, color: '#4169e1' },
      { label: 'RestPop', count: 474, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'GraduateParliament', count: 464, color: '#ffd700' },
      { label: 'RestParliament', count: 141, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'LawDegreePop', count: 36, color: '#4169e1' },
      { label: 'RestPop', count: 569, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'LawDegreeParliament', count: 183, color: '#ffd700' },
      { label: 'RestParliament', count: 422, color: '#888888' }
    ]
  }
  // ...add more steps as needed
];

const foreignChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'ForeignPop', count: 61, color: '#4169e1' },
      { label: 'RestPop', count: 544, color: '#888888' }
    ]
  },
  {
    categories: [
      { label: 'ForeignParliament', count: 13, color: '#ffd700' },
      { label: 'ForeignPop', count: 48, color: '#4169e1' },
      { label: 'RestParliament', count: 544, color: '#888888' }
    ]
  }
];
export { genderChartSteps, ageChartSteps, educationChartSteps, foreignChartSteps };


