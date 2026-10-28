import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'
const COLORS = ["#34D399", "#ef4444", "#f97316"]

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData = [
        {name: "Saldo Total", amount: totalBalance},
        {name: "Despeza Total", amount: totalExpense},
        {name: "Renda Total", amount: totalIncome} 
    ]
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-text">Review Financeiro</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label={"Saldo Total"}
            totalAmount={`${totalBalance}`}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview     