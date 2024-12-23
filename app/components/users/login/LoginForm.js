"use client";
import React, { useState } from "react";
import Title from "../../Title";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/login`, {
        method: "POST", // Cambiado a POST
        credentials: "include", // Incluye las cookies
        cache: "no-store", // No almacena en caché
        headers: {
          "Content-Type": "application/json", // Especifica que envías JSON
        },
        body: JSON.stringify({
          email,
          password,
        }), // Datos enviados en el cuerpo
      });

      const data = await response.json();
      console.log("data", data);
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Title>Login:</Title>
      <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-2">
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Ingresa tu Email.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Ingresa tu Password.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="border-2 border-white py-1 px-4 rounded-xl bg-black text-white">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;