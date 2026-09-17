import React from 'react'
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]

const FinanceOverviewl = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceData = [
        {name: "Saldo Total", amount: totalBalance},
        {name: "Despeza Total", amount: totalExpense},
        {name: "Renda Total", amount: totalIncome} 
    ]
  return (
    <div className=''>
        <div className="">
            <h5 className="">Review Financeiro</h5>
        </div>
    </div>
  )
}

export default FinanceOverviewl     