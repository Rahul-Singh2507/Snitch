import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import { Link ,useNavigate} from "react-router";
import GoogleButton from "../components/GoogleButton.jsx";  
const Login = () => {
  const { handleLogin } = useAuth();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin({
      email: formData.email,
      password: formData.password,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-end p-10 bg-[url('https://images.unsplash.com/photo-1520975922203-b3fbaec2b5c5')] bg-cover bg-center">
        <h1 className="text-4xl font-bold leading-tight">
          Welcome back to your{" "}
          <span className="text-yellow-400">aesthetic.</span>
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold">Login</h2>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={formData.email}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>


<p className="text-sm text-gray-400">
  Already have an account?{" "}
  <Link to="/register" className="text-yellow-400 hover:underline">
    Register    
  </Link>
</p>

<GoogleButton />
        </form>
      </div>
    </div>
  );
};

export default Login;