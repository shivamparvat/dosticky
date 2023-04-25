import React, { useState } from "react";

function Personal() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return <div>Personal</div>;
}

export default Personal;
