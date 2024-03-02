import PropTypes from "prop-types";

export default function FinalStep({ form }) {
  return (
    <>
      <h3>Compte créé avec succès</h3>
      <p>{form.email}</p>
      <p>{form.password}</p>
      <p>{form.username}</p>
    </>
  );
}

FinalStep.propTypes = {
  form: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
