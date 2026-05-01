import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import { Link,useNavigate } from "react-router";
const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    await handleRegister({
      fullname: formData.fullname,
      contact: formData.contact,
      email: formData.email,
      password: formData.password,
      isSeller: formData.isSeller,
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-end p-10 bg-[url('https://images.unsplash.com/photo-1520975922203-b3fbaec2b5c5')] bg-cover bg-center">
        <h1 className="text-4xl font-bold leading-tight">
          Define your <span className="text-yellow-400">aesthetic.</span>
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold">Elevate Your Style</h2>

          {/* Full Name */}
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Contact */}
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-600 p-2 focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Seller Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isSeller"
              onChange={handleChange}
            />
            <label className="text-sm text-gray-400">
              Register as Seller
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 font-semibold hover:bg-yellow-500 transition"
          >
            Sign Up
          </button>

        <p className="text-sm text-gray-400">
  Don’t have an account?{" "}
  <Link to="/login" className="text-yellow-400 hover:underline">
    Login
  </Link>
</p>
        </form>
      </div>
    </div>
  );
};

export default Register;