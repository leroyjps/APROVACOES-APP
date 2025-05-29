// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/Login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      await setDoc(doc(db, "usuariosPermitidos", cred.user.uid), {
        nome,
        email,
        role: "solicitante"
      });
      navigate("/");
    } catch (err) {
      setErro("Erro ao registrar usuário.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-form">
        <h2>Cadastro</h2>
        {erro && <p className="erro">{erro}</p>}
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
        <button type="submit">Cadastrar</button>
        <p>Já tem conta? <Link to="/login">Entrar</Link></p>
      </form>
    </div>
  );
}
