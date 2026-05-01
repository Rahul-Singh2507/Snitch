import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { register } from "../service/auth.api.js";
import { login } from "../service/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ email, contact, password, fullname }) {
    try {
      dispatch(setLoading(true));

      const data = await register({ email, contact, password, fullname });

      dispatch(setUser(data.user));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));

      const data = await login({ email, password });

      dispatch(setUser(data.user));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin };
};