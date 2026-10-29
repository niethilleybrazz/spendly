import React from 'react'
import {LuArrowRight} from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import { formatShortDate } from '../../utils/helper'

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg text-text">Receitas</h5>

            <button className="card-btn" onClick={onSeeMore}>
                Ver todas as receitas <LuArrowRight className="text-base"/>
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={formatShortDate(item.date)}
                    amount={item.amount}
                    type={"income"}
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome