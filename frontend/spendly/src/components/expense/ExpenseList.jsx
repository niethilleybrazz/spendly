import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { formatMonthYear } from '../../utils/helper'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-text">Lista de despesas</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base'/> Baixar resumo
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((expense)=>(
                <TransactionInfoCard
                    key={expense._id}
                    title={expense.category}
                    icon={expense.icon}
                    date={formatMonthYear(expense.date)}
                    amount={expense.amount}
                    type="expense"
                    onDelete={() => onDelete(expense._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList