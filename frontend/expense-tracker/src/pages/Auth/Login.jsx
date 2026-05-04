import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const Login = () => {
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
          <h3 className='text-text text-xl font-semibold'>Bem vindo novamente</h3>
          <p className='text-text text-sm'>Adicione suas credenciais para entrar</p>

      </div>
    </AuthLayout>
  )
}

export default Login