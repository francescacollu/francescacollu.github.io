import { Category } from "../types";

type ChartStep = { categories: Category[]; };

const mpColors = {
  gray: '#888888',
  blue: '#4169e1', 
  yellow: '#ffd700',
};

const genderChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'FemalePop', count: 308, color: mpColors.blue },
      { label: 'RestPop', count: 297, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'FemaleParliament', count: 206, color: mpColors.yellow },
      { label: 'RestParliament', count: 399, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'FemaleParliament', count: 206, color: mpColors.yellow },
      { label: 'FemalePop', count: 102, color: mpColors.blue },
      { label: 'RestParliament', count: 297, color: mpColors.gray }
    ]
  }
  // ...add more steps as needed
];


const ageChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'VeryYoungPop', count: 136, color: mpColors.blue },
      { label: 'RestPop', count: 469, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'YoungPop', count: 65, color: mpColors.blue },
      { label: 'RestPop', count: 540, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'YoungParliament', count: 9, color: mpColors.yellow },
      { label: 'YoungPop', count: 56, color: mpColors.blue },
      { label: 'RestParliament', count: 540, color: mpColors.gray }
    ]
  }
  // ...add more steps as needed
];

const educationChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'GraduatePop', count: 131, color: mpColors.blue },
      { label: 'RestPop', count: 474, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'GraduateParliament', count: 464, color: mpColors.yellow },
      { label: 'RestParliament', count: 141, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'LawDegreePop', count: 36, color: mpColors.blue },
      { label: 'RestPop', count: 569, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'LawDegreeParliament', count: 183, color: mpColors.yellow },
      { label: 'RestParliament', count: 422, color: mpColors.gray }
    ]
  }
  // ...add more steps as needed
];

const foreignChartSteps: ChartStep[] = [
  {
    categories: [
      { label: 'All', count: 605, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'ForeignPop', count: 61, color: mpColors.blue },
      { label: 'RestPop', count: 544, color: mpColors.gray }
    ]
  },
  {
    categories: [
      { label: 'ForeignParliament', count: 13, color: mpColors.yellow },
      { label: 'ForeignPop', count: 48, color: mpColors.blue },
      { label: 'RestParliament', count: 544, color: mpColors.gray }
    ]
  }
];

export { genderChartSteps, ageChartSteps, educationChartSteps, foreignChartSteps, mpColors };


