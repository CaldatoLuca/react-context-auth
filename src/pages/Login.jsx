import InputElement from "../components/InputElement";
import useForm from "../useForm";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const location = useLocation();
  const { login } = useAuth();

  const { message } = location.state || {};

  const formFields = [
    { type: "email", name: "email", label: "Email" },
    { type: "password", name: "password", label: "Password" },
  ];

  const [formValues, handleInputChange, resetForm] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formValues;
    const user = { email, password };
    login(user);

    resetForm();
  };

  return (
    <div className="w-1/2 flex flex-col gap-6">
      {message ? (
        <div className="text-center bg-red-500 text-xl rounded-md px-2 py-1">
          {" "}
          {message}
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {formFields.map((field) => (
          <InputElement
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            value={formValues[field.name]}
            onChange={handleInputChange}
            options={field.options}
          />
        ))}
        <div>
          <button
            type="submit"
            className=" p-1 px-2 bg-neutral-100 text-neutral-900 mt-6 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
