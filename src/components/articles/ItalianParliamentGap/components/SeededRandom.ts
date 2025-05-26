class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  random(): number {
    // Simple LCG (Linear Congruential Generator)
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }
  
  // Helper methods for common random operations
  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }
  
  randomFloat(min: number, max: number): number {
    return this.random() * (max - min) + min;
  }
  
  randomChoice<T>(array: T[]): T {
    return array[Math.floor(this.random() * array.length)];
  }
}

export default SeededRandom; 