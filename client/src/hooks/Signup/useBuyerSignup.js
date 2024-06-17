import Auth from "../../utils/auth";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { buyer_Signup } from "../../graphql/mutations";
import { useAuthContext } from "../useAuthContext";

export const useBuyerSignup = () => {
  const [stateError, setStateError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //  Mutation
  const [AddUser, { error, loading, data }] = useMutation(buyer_Signup);

  const signup = async (formState) => {
    setIsLoading(true);
    setStateError(null);

    try {
      const { data } = await AddUser({
        variables: formState,
      });

      Auth.login(data.AddUser.token); // create new token

      dispatch({ type: "LOGIN", payload: data }); // update the auth context

      setIsLoading(false);

      return true; // Indicate a successful registration
    } catch (e) {
      setStateError(true);
      setIsLoading(false);
      console.error("AddUser error in useSignup() hook:", e);
      return false; // Indicate a failed registration
    }
  };
  return { signup, isLoading, stateError };
};
