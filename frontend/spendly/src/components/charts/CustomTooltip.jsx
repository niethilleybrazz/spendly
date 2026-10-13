import React from 'react'

const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length){
        return(
            <div className="bg-white shadow-md rounded-lg p-2 border border-borders">
                <p className="text-xs font-semibold mb-1 text-contrast">{payload[0].name}</p>
                <p className="text-sm text-text-gray">
                    <span className='text-sm font-medium text-text-gray'>${payload[0].value}</span>
                </p>
            </div>
        )
    }
    return null
}

export default CustomTooltip