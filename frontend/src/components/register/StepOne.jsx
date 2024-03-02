import PropTypes from "prop-types";

export default function StepOne({ formTools }) {
  return (
    <>
      <h2>Veuillez fournir votre adresse email et votre password</h2>
      <input
        onChange={formTools.handleChangeForm}
        name="email"
        type="email"
        placeholder="Veuillez entrer un email"
      />
      <input
        onChange={formTools.handleChangeForm}
        name="password"
        type="password"
        placeholder="Veuillez entrer un password"
      />
      <button type="button" onClick={formTools.nextStep}>
        Continuer
      </button>
    </>
  );
}

StepOne.propTypes = {
  formTools: PropTypes.shape({
    handleChangeForm: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
  }).isRequired,
};
