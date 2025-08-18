'use client';
import { getUserApi, signinApi, signupApi } from "@/service/authService";
import { useRouter } from "next/navigation";

import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
const AuthContext = createContext();
const initaistate = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};



function authReducer(state, action) {
  switch (action.type) {
    case "loading": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "rejected": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case "signin":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "signup":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
  }
}
export function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initaistate
  );
  const router = useRouter();
  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const {
        data: { message, user },
      } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/blogs");
    } catch (err) {
      const error = err?.response?.data?.message;
      dispatch({ type: "rejected", payload: error });
      toast.error(error);
    }
  }
  async function signup(valuse) {
    dispatch({ type: "loading" });
    try {
      const {
        data: { user, message },
      } = await signupApi(valuse);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/blog");
    } catch (err) {
      const error =err?.response?.data?.message;
      dispatch({ type: "rejected", payload:error });
      toast.error(error);

    }
    
  }
  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const {
        data: { user },
      } = await getUserApi(); 
      dispatch({ type: "user/loaded", payload: user }); 
    } catch (err) {
      const error = err?.response?.data?.message ;
      toast.error(error); 
      dispatch({ type: "rejected", payload: error });
    
    }
  }
  

  useEffect(() => {
    async function fetchData() {
      await getUser(); 
    }
    fetchData();
  }, []); 

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signin,
        signup,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthPrivider");
  }
  return context;
}