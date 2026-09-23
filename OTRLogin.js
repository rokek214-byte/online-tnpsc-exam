import React, { useState } from "react";
import contestants from "./data";

function OTRLogin({ onLogin }) {
  const [otr, setOtr] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const candidate = contestants.find(
      (item) =>
        item.otr.toLowerCase() ===
        otr.trim().toLowerCase()
    );

    if (!candidate) {
      setError("Invalid OTR Number");
      return;
    }

    setError("");
    onLogin(candidate);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>TNPSC</h1>

        <h2>Online Examination</h2>

        <p>One Time Registration Login</p>

        <input
          type="text"
          placeholder="Enter OTR Number"
          value={otr}
          onChange={(e) =>
            setOtr(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <p className="example">
        </p>
      </div>
    </div>
  );
}

export default OTRLogin;