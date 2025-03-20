export class AIModel {
    constructor() {
      console.log("AI Model initialized...");
    }
  
    predict(input: any): string {
      console.log("Processing input:", input);
      return "Dummy Prediction";
    }
  }
  
  export const aiModel = new AIModel();