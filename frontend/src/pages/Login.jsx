/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useContext } from "react";
import axios from "axios";

import UserContext from "../services/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3310/api/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) =>
        setUser({
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
        })
      )
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>Se connecter</h1>
      <form onSubmit={submitForm}>
        <label>Email</label>
        <input type="email" onChange={handleChangeEmail} />
        <label>Password</label>
        <input type="password" onChange={handleChangePassword} />
        <input type="submit" />
      </form>
    </>
  );
}
