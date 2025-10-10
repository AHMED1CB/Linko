import { createContext, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../Redux/Features/Auth/AuthServices";
import { LoaderProvider, useLoader } from "./LoaderContext";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();
  useEffect(() => {
    const getUser = async () => {
      try {
        showLoader();
        await dispatch(GetUserProfile()).unwrap();
      } finally {
        hideLoader();
      }
    };

    getUser();
  }, [dispatch]);

  return user && <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
