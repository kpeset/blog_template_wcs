import PropTypes from "prop-types";

export default function StepTwo({ formTools }) {
  return (
    <>
      <h2>Veuillez fournir un pseudo</h2>
      <input
        name="username"
        onChange={formTools.handleChangeForm}
        type="text"
        placeholder="Veuillez entrer un pseudo"
      />
      <button type="button" onClick={formTools.submitForm}>
        Continuer
      </button>
      {formTools.isError ? <p>Erreur lors de l'inscription</p> : ""}
    </>
  );
}

StepTwo.propTypes = {
  formTools: PropTypes.shape({
    handleChangeForm: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
  }).isRequired,
};
