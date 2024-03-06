/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import axios from "axios";

export default function Login() {
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
      .then((response) => console.info(response))
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
