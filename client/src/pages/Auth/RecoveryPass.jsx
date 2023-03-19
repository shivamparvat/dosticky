import React, { useState } from "react";

function RecoveryPass() {
    const [password, setPassword] = useState("")
    const [conformPassword, setConformPassword] = useState("")
  return (
    <div className="passwordContainer recovery">
      <div className="loginCaontainer auth">
        <div>
          <h1>recovery</h1>
        </div>
        <div className="emailCaontainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
        </div>
        <div className="passwordContainer">
          <label htmlFor="password">Conform Password</label>
          <input
            type="password"
            value={conformPassword}
            onChange={(e) => setConformPassword(e.target.value)}
            placeholder="Conform Password"
          />
          <br />
          <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
        </div>
        <div className="loginbutton recovery">
          <input type="button" value="change password" />
        </div>
      </div>
    </div>
  );
}

export default RecoveryPass;
