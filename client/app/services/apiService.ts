import axios from 'axios';
import type { FeatureImportance, PredictionInputData, PredictionResult } from '../types';

const API_BASE_URL: string = 'http://localhost:5000';

export const makePrediction = async (data: PredictionInputData): Promise<PredictionResult> => {
  // For development/demo purposes, return mock data if API fails
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('Returning mock data for development');
  //   return getMockPredictionResult(data);
  // }

  try {
    const response = await axios.post<PredictionResult>(`${API_BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    

    
    throw error;
  }
};


export const getFeatureImportance = async (): Promise<FeatureImportance[]> => {
  // For development/demo purposes, return mock data if API fails
  if (process.env.NODE_ENV === 'development') {
    console.log('Returning mock data for development');
    return getMockImportance();
  }
  
  try {
    const response = await axios.get<FeatureImportance[]>(`${API_BASE_URL}/feature-importance`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    throw error;
  }
};


const getMockPredictionResult = (inputData: PredictionInputData): PredictionResult => {
  const hash = inputData.homeworld.length * 7 + inputData.unitType.length * 3;
  const confidence = 0.5 + (hash % 50) / 100;
  
  return {
    input: { ...inputData },
    prediction: {
      outcome: confidence > 0.75 ? 'Success' : 'Failure',
      //confidence: confidence
    },
    featureImportance: [
      { name: 'Homeworld', importance: 0.45 },
      { name: 'Unit Type', importance: 0.35 },
      { name: 'Technology Level', importance: 0.12 },
      { name: 'Resource Availability', importance: 0.08 }
    ]
  };
};

const getMockImportance = () : FeatureImportance[] => {
  return [
    {
      name: "Region",
      importance: 100,
    },
    {
      name: "Job",
      importance: 80,
    },
    {
      name: "Planet",
      importance: 30,
    }
  ]
}