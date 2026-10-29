import React from 'react'
import { formatBRL } from '../../utils/helper'

const InfoCard = ({icon, label, value, color}) => {
  return <div className='flex gap-6'>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-text-fade ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className='text-sm text-text-fade mb-1'>{label}</h6>
            <span className='text-[22px] text-text font-numbers'>{formatBRL(value)}</span>
        </div>
  </div>
}

export default InfoCard