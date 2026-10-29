import { formatBRL } from '../../utils/helper'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area, 
  AreaChart
} from 'recharts'

const CustomToolTip = ({active, payload}) => {
    if(active && payload && payload.length) {
        return(
            <div className="bg-white shadow-md rounded-lg p-2 border border-borders">
                <p className="text-xs font-medium text-contrast">{payload[0].payload.category}</p>
                <p className='text-sm text-gray-950'>Total: <span className='text-sm font-medium'>{formatBRL(payload[0].payload.amount)}</span></p>
            </div>
        )
    }

    return null
}

const CustomLineChart = ({data}) => {
  return (
    <div className='bg-background01'>
        <ResponsiveContainer width={"100%"} height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id='incomeGradient' x1={"0"} y1={"0"} x2={"0"} y2={"1"}>
                        <stop offset={"5%"} stopColor='#34D399' stopOpacity={0.4}/>
                        <stop offset={"95%"} stopColor='#34D399' stopOpacity={0}/>
                    </linearGradient>
                </defs>

                <CartesianGrid stroke='none'/>
                <XAxis dataKey="month" tick={{fontSize: 12, fill: "#d6d6d6ff"}} stroke='none'/>
                <YAxis tick={{fontSize: 12, fill: "#d6d6d6ff"}} stroke='none'/>
                <Tooltip content={<CustomToolTip/>}/>

                <Area type="monotone" dataKey="amount" stroke='#34D399' fill="url(#incomeGradient)" strokeWidth={3} dot={{r:3, fill:"#ab8df8"}}/>
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart