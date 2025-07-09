import axios from 'axios';
import type { PredictionInputData, PredictionResult } from '../types';

// Base URL for API
const API_BASE_URL: string = 'https://api.example.com';

/**
 * Makes a prediction request to the API
 * @param {PredictionInputData} data - The input data for prediction
 * @returns {Promise<PredictionResult>} - The prediction result
 */
export const makePrediction = async (data: PredictionInputData): Promise<PredictionResult> => {
  try {
    const response = await axios.post<PredictionResult>(`${API_BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    
    // For development/demo purposes, return mock data if API fails
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock data for development');
      return getMockPredictionResult(data);
    }
    
    throw error;
  }
};

/**
 * Generates mock prediction data for development/testing
 * @param {PredictionInputData} inputData - The input data
 * @returns {PredictionResult} - Mock prediction result
 */
const getMockPredictionResult = (inputData: PredictionInputData): PredictionResult => {
  // Generate a deterministic but seemingly random confidence based on inputs
  const hash = inputData.homeworld.length * 7 + inputData.unitType.length * 3;
  const confidence = 0.5 + (hash % 50) / 100; // Between 0.5 and 0.99
  
  return {
    input: { ...inputData },
    prediction: {
      outcome: confidence > 0.75 ? 'Success' : 'Failure',
      confidence: confidence
    },
    featureImportance: [
      { name: 'Homeworld', importance: 0.45 },
      { name: 'Unit Type', importance: 0.35 },
      { name: 'Technology Level', importance: 0.12 },
      { name: 'Resource Availability', importance: 0.08 }
    ]
  };
};
