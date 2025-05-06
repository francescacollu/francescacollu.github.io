export interface DataPoint {
  label: string;
  value: number;
  color: string;
}

export interface VisualizationData {
  title: string;
  subtitle: string;
  total: number;
  data: {
    parliament: DataPoint[];
    population: DataPoint[];
  };
  steps: {
    title: string;
    text: string;
  }[];
}

export const parliamentData: VisualizationData = {
  title: "The Italian Parliament Gap",
  subtitle: "Scroll through this interactive demonstration to see how data can come alive",
  total: 605,
  data: {
    parliament: [
      { label: "Women", value: 206, color: "#ff5932" },
      { label: "Men", value: 399, color: "#000000" }
    ],
    population: [
      { label: "Women", value: 295, color: "#ff5932" },
      { label: "Men", value: 310, color: "#000000" }
    ]
  },
  steps: [
    {
      title: "The Italian Parliament",
      text: "The Italian Parliament consists of 605 seats. This visualization shows the current gender distribution in the Chamber of Deputies."
    },
    {
      title: "Gender Representation in Parliament",
      text: "Women currently hold 206 seats (34%) in the Italian Parliament. While this represents progress, there's still a significant gender gap in parliamentary representation."
    },
    {
      title: "Population vs Parliament",
      text: "While women make up 51% of the Italian population, they only hold 34% of parliamentary seats. This significant gap highlights the need for greater gender equality in political representation."
    }
  ]
}; 