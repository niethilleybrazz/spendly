import React, { useState } from 'react'
import Input from "../inputs/Input"
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    })

    const handleChange = (key, value) => setIncome({...income, [key]:value})

  return (
    <div>
        <EmojiPickerPopup
            icon={income.icon}
            onSelect={(selectedIcon)=> handleChange("icon", selectedIcon)}
        />

        <Input
            value={income.soure}
            onChange={({target})=> handleChange("source", target.value)}
            label="Fonte de renda"
            placeholder="Freelance, Salário, etc"
            type="text"
        />

        <Input
            value={income.amount}
            onChange={({target})=> handleChange("amount", target.value)}
            label="Total"
            placeholder=""
            type="number"
        />

        <Input
            value={income.date}
            onChange={({target})=> handleChange("date", target.value)}
            label="Data"
            placeholder=""
            type="date"
        />

        <div className="flex justify-end mt-6">  
            <button className="add-btn add-btn-fill"
                type='button'
                onClick={()=> onAddIncome(income)}
            >
                Adicionar Receita
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm