import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); 

    if(!validateEmail(email)){
      setError("Opa! Coloque um email válido.")
      return
    }
    if(!validatePassword(password)){
      setError("Opa! Insira uma senha válida.")
      return
    }
    setError("")
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-text text-xl font-semibold">
          Bem vindo novamente
        </h3>
        <p className="text-text text-sm mt-1.25 mb-6">
          Adicione suas credenciais para entrar
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            label="Email"
            type="email"
            placeholder="exemplo@exemplo.com"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            value={password}
            label="Senha"
            type="password"
            placeholder="Min. 8 caracteres"
            onChange={({ target }) => setPassword(target.value)}
          />

          {error && <p className="text-error text-sm mb-1">{error}</p>}
          <button type="submit" className="btn-primary">Entrar</button>

          <p className="text-text text-sm mt-4">Ainda não tem uma conta? {""}
            <Link className= "font-medium underline text-contrast" to="/signUp">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
