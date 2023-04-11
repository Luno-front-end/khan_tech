import { ChangeEvent, FC, FormEvent, useState } from "react";
import Api from "../../Api/getEmployees";
import { Form } from "./Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../Redux/slices/adminAuthUser";

export const SignIn: FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const navigate = useNavigate();

  //   const userInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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

    await Api.login(name, password)
      .then((res) => {
        dispatch(auth(res!.data));
        navigate("/admin-panel");
      })
      .catch((err) => setErr(err.response.data.message));
  };

  return (
    <div className="wrapper-signIn">
      <div>
        <h1>SignIn</h1>
        <Form
          name={name}
          password={password}
          handleChange={handleChange}
          handleSubmite={handleSubmite}
        />
        <p className="error">{err}</p>
        <Link to="/reg" className="go-auth">
          Go to registration
        </Link>
      </div>
    </div>
  );
};
