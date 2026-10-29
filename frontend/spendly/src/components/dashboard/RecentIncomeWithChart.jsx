import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'
import { formatBRL } from '../../utils/helper'

const COLORS = ["#34D399", "#ef4444", "#f97316", "#3b82f6"]

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const chartData =
    data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    })) || []

  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-lg text-text'>Receitas dos últimos 60 dias</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total de receitas"
        totalAmount={formatBRL(totalIncome)}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart