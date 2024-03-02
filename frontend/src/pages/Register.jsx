import { useState } from "react";
import axios from "axios";

import StepOne from "../components/register/StepOne";
import StepTwo from "../components/register/StepTwo";
import FinalStep from "../components/register/FinalStep";

export default function Register() {
  const [step, setStep] = useState(1);
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleChangeForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, form)
      .then((response) => {
        console.info(response);
        nextStep();
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      });
  };

  const displayStepComponent = () => {
    if (step === 1) {
      return <StepOne formTools={{ nextStep, handleChangeForm }} />;
    }
    if (step === 2) {
      return (
        <StepTwo
          formTools={{ nextStep, handleChangeForm, submitForm, isError }}
        />
      );
    }
    return <FinalStep form={form} />;
  };

  return (
    <form>
      <h1>Créer un compte</h1>
      {displayStepComponent()}
    </form>
  );
}
