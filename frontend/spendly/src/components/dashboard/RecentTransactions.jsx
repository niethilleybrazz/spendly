import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

import TransactionInfoCard from '../cards/TransactionInfoCard'

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg text-text'>Transações Recentes</h5>

            <button className='card-btn' onClick={onSeeMore}>
                Ver mais <LuArrowRight/>
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.type == 'expense' ? item.category : item.source}
                    icon={item.icon}
                    date={moment(item.date).locale("pt-br").format("MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions