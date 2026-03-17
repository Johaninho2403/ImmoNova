import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stepper from "../components/Stepper";
import { Await, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const { isAuth } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center">
      <div className="border-x-2  border-primary w-10 h-10 rounded-full animate-spin"></div>
    </div>}>
      <Await resolve={isAuth}>
        {({ data }) => {
          if (!data.success) {
            navigate("/signin");
          }
          return (
            <div>
              <Navbar />
              <Stepper />
              <Footer />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default AddProperty;
