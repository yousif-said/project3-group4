// Input data types
export interface PredictionInputData {
    homeworld: string;
    unitType: string;
  }
  
  // Prediction result types
  export interface PredictionOutcome {
    outcome: string;
    confidence: number;
  }
  
  // Feature importance type
  export interface FeatureImportance {
    name: string;
    importance: number;
  }
  
  // Complete prediction result
  export interface PredictionResult {
    input: PredictionInputData;
    prediction: PredictionOutcome;
    featureImportance: FeatureImportance[];
  }
  
  // Form error state
  export interface FormErrors {
    homeworld?: string;
    unitType?: string;
    submit?: string;
  }
  