// HistoryWrapper.tsx
import React, { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HistoryWrapperProps {
  children: ReactNode;
}

const HistoryWrapper: React.FC<HistoryWrapperProps> = ({ children }) => {
  // alert("hashchange");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (event: HashChangeEvent) => {
      // alert("back button");
      event.preventDefault();
      navigate(-1);
    };

    window.addEventListener("hashchange", handleBackButton);

    return () => {
      window.removeEventListener("hashchange", handleBackButton);
    };
  }, [navigate, location]);

  return <>{children}</>;
};

export default HistoryWrapper;
