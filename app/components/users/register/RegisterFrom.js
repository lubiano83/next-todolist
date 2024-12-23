"use client";
import React, { useState } from 'react';
import Title from '../../Title';
import { useRouter } from 'next/navigation';

const RegisterFrom = () => {

    const [ first_name, setFirst_name ] = useState("");
    const [ last_name, setLast_name ] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`http://localhost:3000/api/users`, {
            method: "POST", // Cambiado a POST
            credentials: "include", // Incluye las cookies
            cache: "no-store", // No almacena en caché
            headers: {
              "Content-Type": "application/json", // Especifica que envías JSON
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
            }), // Datos enviados en el cuerpo
          });
          const data = await response.json();
          router.push("/views/login");
          router.refresh();
        } catch (err) {
          setError(err.message);
        }
    }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-black bg-opacity-25 min-w-72 p-8 rounded-3xl flex flex-col justify-center items-center gap-3">
      <Title>Register:</Title>
      <form onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-2">
            <input type="first_name" id="first_name" value={first_name} onChange={(e) => setFirst_name(e.target.value)} required placeholder="Ingresa tu Nombre.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
            <input type="last_name" id="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} required placeholder="Ingresa tu Apellido.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Ingresa tu Email.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Ingresa tu Password.." className="pl-2 border-2 border-black rounded-xl w-64 h-9" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="border-2 border-white py-1 px-4 rounded-xl bg-black text-white">Register</button>
      </form>
      </div>
    </div>
  )
}

export default RegisterFrom;