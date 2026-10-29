import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../charts/CustomLineChart'

const ExpenseOverview = ({transactions, onExpenseIncome}) => {
   const chartData = prepareExpenseLineChartData(transactions)
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg text-text">Visão geral das despesas</h5>
                <p className='text-xs text-text-fade mt-0.5'>Acompanhe seus padrões de gastos ao longo do tempo e obtenha informações sobre para onde seu dinheiro está indo.</p>
            </div>

            <button className="add-btn" onClick={onExpenseIncome}>
                <LuPlus className='text-lg'/>
                Adicionar despesa
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseOverview