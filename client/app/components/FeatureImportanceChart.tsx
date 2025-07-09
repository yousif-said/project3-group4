import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { FeatureImportance } from '../types';

import { useState, useEffect, useMemo } from 'react'
import { getFeatureImportance } from '~/services/apiService';

const FeatureImportanceChart: React.FC = () => {

  const [features, setFeatures] = useState<FeatureImportance[]>([])

  useEffect(()=> {
    (async () => {
      const importance = await getFeatureImportance()
      setFeatures(importance)
    })()
  }, [])
  
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);
  
  
  const getBarColor = (value: number): string => {
    const maxImportance = Math.max(...features.map(f => f.importance));
    const intensity = Math.round((value / maxImportance) * 100);
    return `rgb(59, ${130 + (100 - intensity)}, ${200 + (55 - intensity/2)})`;
  };

  const maxImportance = useMemo(() => {
    if (!sortedFeatures || sortedFeatures.length === 0) {
      return 0;
    }
    return Math.max(...sortedFeatures.map(feature => feature.importance));
  }, [sortedFeatures]);

  const xAxisUpperBound = useMemo(() => {
    return maxImportance * 1.2;
  }, [maxImportance]);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedFeatures}
          layout="vertical"
          margin={{ top: 5, right: 80, left: 80, bottom: 5 }}
          barCategoryGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, xAxisUpperBound]} />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={180}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
            labelFormatter={(label: string) => `Feature: ${label}`}
          />
          <Bar
            dataKey="importance"
            >
            {sortedFeatures.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.importance)} />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
