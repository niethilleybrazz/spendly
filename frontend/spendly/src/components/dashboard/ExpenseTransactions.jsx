import React from "react";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import { formatShortDate } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg text-text">Despesas</h5>

        <button className="card-btn" onClick={onSeeMore}>
          Ver todas as despesas <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={formatShortDate(expense.date)}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
