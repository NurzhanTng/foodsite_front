// HistoryWrapper.tsx
import React, { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HistoryWrapperProps {
  children: ReactNode;
}

const HistoryWrapper: React.FC<HistoryWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      navigate(-1);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate, location]);

  return <>{children}</>;
};

export default HistoryWrapper;