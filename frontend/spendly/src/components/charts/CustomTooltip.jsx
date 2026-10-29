import React from 'react'
import { formatBRL } from '../../utils/helper'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-borders">
        <p className="text-xs font-semibold text-contrast mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="text-sm font-medium text-gray-900">
            {formatBRL(payload[0].payload.amount)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip