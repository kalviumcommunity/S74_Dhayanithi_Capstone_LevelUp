import React from "react";
import { useLoader } from "../context/loaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoader;
