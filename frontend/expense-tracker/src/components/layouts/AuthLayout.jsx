import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div>
        <div className="text-text text-2xl font-semibold">Spendly</div>
        {children}
    </div>
  )
}

export default AuthLayout