import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureImportanceChart from './FeatureImportanceChart';
import type { PredictionInputData, PredictionResult } from '../types';
import { useSearchParams } from 'react-router-dom';
import { makePrediction } from '~/services/apiService';

const PredictionResults = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const homeworld = searchParams.get("homeworld")
      const unitType = searchParams.get("unitType")
      
      if(homeworld && unitType){
        const predictionInput : PredictionInputData = {
          homeworld,
          unitType
        }
  
         try {
        const result = await makePrediction(predictionInput)
        setResult(result)
      } catch (err) {
        setError("Failed to fetch prediction.")
      } finally {
        setLoading(false)
      }
    } else {
      setError("Missing input values.")
      setLoading(false)
    }
  })()
}, [])

  const handleNewPrediction = () => {
    navigate('/');
  };

  const capitalizeWords = (str : string) : string => {
    if (!str) return ''; // Handle null, undefined, or empty strings
    return str
      .split(' ') // Split the string into an array of words
      .map(word => {
        if (word.length === 0) return ''; // Handle empty strings that might result from multiple spaces
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter, lowercase rest
      })
      .join(' '); // Join the words back into a single string
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 min-w-1/2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 min-w-1/2">
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
        <button
          onClick={handleNewPrediction}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Make New Prediction
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 min-w-1/2">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Prediction Results
      </h2>
      
      { result && <>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Input Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-500">Homeworld</p>
                <p className="font-medium">{capitalizeWords(result.input.homeworld)}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Unit Type</p>
                <p className="font-medium">{result.input.unitType}</p>
            </div>
            </div>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Prediction</h3>
            <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-blue-600">Predicted Outcome</p>
                <p className="text-2xl font-bold">{capitalizeWords(result.prediction.outcome)}</p>
            </div>
            {/* <div>
                <p className="text-sm text-blue-600">Confidence</p>
                <p className="text-2xl font-bold">{(result.prediction.confidence * 100).toFixed(1)}%</p>
            </div> */}
            </div>
        </div>
        
      </>}
      
      <button
        onClick={handleNewPrediction}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Make New Prediction
      </button>
    </div>
  );
};

export default PredictionResults;
