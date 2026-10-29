import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({transactions, onAddIncome}) => {
    const chartData = prepareIncomeBarChartData(transactions)
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg text-text">Visão geral das receitas</h5>
            <p className='text-xs text-text-fade mt-0.5'>
                Acompanhe a evolução das receitas.
            </p>
          </div>

          <button className="add-btn" onClick={onAddIncome}>
              <LuPlus className='text-lg'/>
              Adicionar Receita
          </button>
        </div>

        <div className="mt-10">
          <CustomBarChart data={chartData} xKey="month" />
        </div>
    </div>
  )
}

export default IncomeOverview