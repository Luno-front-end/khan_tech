import { ChangeEvent, FC, FormEvent, useState } from "react";
import Api from "../../Api/getEmployees";
import { Form } from "./Form";
import { Link, useNavigate } from "react-router-dom";

export const SignUp: FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await Api.registration(name, password)
      .then(() => navigate("/login"))
      .catch((err)=>setErr(err.response.data.message));
  
  };

  return (    
    <div className="wrapper-signIn">
      <div>
        <h1>SignUp</h1>

        <Form
          name={name}
          password={password}
          handleChange={handleChange}
          handleSubmite={handleSubmite}
        />
        <p className="error">{err}</p>
        <Link className="go-auth" to="/login">
          Go to login
        </Link>
      </div>
    </div>
  );
};
