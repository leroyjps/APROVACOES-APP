// src/pages/AdminUsuarios.js
import React, { useEffect, useState } from "react";
import { databases, IDHelper } from "../lib/appwrite";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const res = await databases.listDocuments("SEU_DATABASE_ID", "usuariosPermitidos");
        setUsuarios(res.documents);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }
    carregarUsuarios();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Administração de Usuários</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.$id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
