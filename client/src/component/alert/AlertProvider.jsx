import React, { useEffect, useState } from "react";
import "./AlertProvider.css";
import { createContext } from "react";
const AlertContext = createContext();

function AlertProvider({ children }) {
  const [error, setError] = useState({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError({})
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [error]);


  return (
    <div>
      {Object.entries(error).length !== 0 && error.msg && (
        <div
          className={`alrtComponent ${
            error.error === "success" ? "success" : ""
          }`}
        >
          <p>{error.msg}</p>
        </div>
      )}

      <AlertContext.Provider value={{error,setError}}>
        {children}
      </AlertContext.Provider>
    </div>
  );
}

export default AlertProvider;
export { AlertContext };
