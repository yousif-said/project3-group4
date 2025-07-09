import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makePrediction } from '../services/apiService';

import type { PredictionInputData, FormErrors } from '../types';

const InputForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PredictionInputData>({
    homeworld: '',
    unitType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const homeworldOptions: string[] = ['Earth', 'Mars', 'Venus', 'Jupiter', 'Saturn'];
  const unitTypeOptions: string[] = ['Infantry', 'Cavalry', 'Artillery', 'Air Force', 'Navy'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.homeworld) {
      newErrors.homeworld = 'Homeworld is required';
    }
    
    if (!formData.unitType) {
      newErrors.unitType = 'Unit Type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      navigate(`/results?homeworld=${formData.homeworld}&unitType=${formData.unitType}`);
    } catch (error) {
      console.error('Prediction error:', error);
      setErrors({
        ...errors,
        submit: 'Failed to get prediction. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Enter Prediction Data
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Homeworld Field */}
        <div className="mb-4">
          <label 
            htmlFor="homeworld" 
            className="block text-gray-700 font-medium mb-2"
          >
            Homeworld
          </label>
          <select
            id="homeworld"
            name="homeworld"
            value={formData.homeworld}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.homeworld ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
          >
            <option value="">Select Homeworld</option>
            {homeworldOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.homeworld && (
            <p className="text-red-500 text-sm mt-1">{errors.homeworld}</p>
          )}
        </div>
        
        {/* Unit Type Field */}
        <div className="mb-6">
          <label 
            htmlFor="unitType" 
            className="block text-gray-700 font-medium mb-2"
          >
            Unit Type
          </label>
          <select
            id="unitType"
            name="unitType"
            value={formData.unitType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.unitType ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
          >
            <option value="">Select Unit Type</option>
            {unitTypeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.unitType && (
            <p className="text-red-500 text-sm mt-1">{errors.unitType}</p>
          )}
        </div>
        
        {/* Submit Error Message */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.submit}
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Get Prediction'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
