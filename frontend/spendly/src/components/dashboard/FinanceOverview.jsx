import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'
import { formatBRL } from '../../utils/helper'
const COLORS = ["#34D399", "#ef4444", "#f97316"]

const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData = [
        {name: "Saldo total", amount: totalBalance},
        {name: "Total de despesas", amount: totalExpense},
        {name: "Total de receitas", amount: totalIncome}
    ]
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-text">Visão geral financeira</h5>
        </div>

        <CustomPieChart
            data={balanceData}
            label={"Saldo total"}
            totalAmount={formatBRL(totalBalance)}
            colors={COLORS}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview     