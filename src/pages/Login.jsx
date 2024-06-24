import InputElement from "../components/InputElement";
import useForm from "../useForm";

const Login = () => {
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
    resetForm();
  };

  return (
    <div className="w-1/2">
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
