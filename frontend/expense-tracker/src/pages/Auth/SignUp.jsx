import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""
    if(!fullName) {
      setError("Por favor, adicione seu nome!")
      return
    }
    if(!validateEmail(email)){
      setError("Por favor, adicione um email válido!")
      return
    }
    if(!password){
      setError("Por favor, adicione uma senha!")
      return
    }

    setError("")
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl text-text font-medium">Crie sua conta</h3>
        <p className="text-sx text-text mt-1.25 mb-6">
          Junte-se a nós adicionando suas informações a baixo
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Nome Completo"
              placeholder={"Seu nome completo"}
              type="text"
            />

            <Input
              value={email}
              label="Email"
              type="email"
              placeholder="exemplo@exemplo.com"
              onChange={({ target }) => setEmail(target.value)}
            />

            <div className="col-span-2">
              <Input
                value={password}
                label="Senha"
                type="password"
                placeholder="Min. 8 caracteres"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>

          {error && <p className="text-error text-sm mb-1">{error}</p>}
          <button type="submit" className="btn-primary">
            Cadastrar
          </button>

          <p className="text-text text-sm mt-4">
            Já tem uma conta? {""}
            <Link className="font-medium underline text-contrast" to="/login">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
