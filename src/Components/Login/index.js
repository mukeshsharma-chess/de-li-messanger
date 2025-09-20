'use client'

import { userLoginAction } from "@/redux/actions/loginActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const formDataObject = new FormData();
    formDataObject.append("email", "admin@de-li.com");
    formDataObject.append("password", "secret");

    dispatch(userLoginAction(formDataObject)); // sends FormData to saga/reducer
  }, [dispatch]);

  return null;
};

export default LoginComponent;
