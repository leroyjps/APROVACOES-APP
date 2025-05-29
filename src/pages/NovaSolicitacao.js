// src/pages/NovaSolicitacao.js
import React, { useState } from "react";
import { databases, storage, IDHelper } from "../lib/appwrite";
import "../styles/NovaSolicitacao.css";

export default function NovaSolicitacao() {
  const [form, setForm] = useState({
    titulo: "",
    fornecedor: "",
    valor: "",
    descricao: "",
    prioridade: "baixa",
    tipoOC: "compra",
    categoria: "outra",
    data: "",
  });

  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const databaseId = "SEU_DATABASE_ID";
  const collectionId = "SEU_COLLECTION_ID";
  const bucketId = "SEU_BUCKET_ID";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    try {
      let fileId = null;
      if (file) {
        const upload = await storage.createFile(bucketId, IDHelper.unique(), file);
        fileId = upload.$id;
      }

      await databases.createDocument(databaseId, collectionId, IDHelper.unique(), {
        ...form,
        valor: Number(form.valor),
        fileId: fileId || null,
        criadoEm: new Date().toISOString(),
      });

      setMensagem("Solicitação enviada com sucesso!");
      setForm({ titulo: "", fornecedor: "", valor: "", descricao: "", prioridade: "baixa", tipoOC: "compra", categoria: "outra", data: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao enviar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nova-solicitacao-container">
      <h2>Nova Solicitação</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="form-solicitacao">
        <input type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <input type="text" name="fornecedor" placeholder="Fornecedor" value={form.fornecedor} onChange={handleChange} required />
        <input type="number" name="valor" placeholder="Valor Total" value={form.valor} onChange={handleChange} required />
        <textarea name="descricao" placeholder="Descrição do item" value={form.descricao} onChange={handleChange} required />
        <select name="prioridade" value={form.prioridade} onChange={handleChange}>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="urgente">Urgente</option>
        </select>
        <select name="tipoOC" value={form.tipoOC} onChange={handleChange}>
          <option value="compra">Compra</option>
          <option value="servico">Serviço</option>
        </select>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="outra">Outra</option>
          <option value="capex">Capex</option>
          <option value="bid">Bid</option>
        </select>
        <input type="date" name="data" value={form.data} onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar Solicitação"}</button>
      </form>
    </div>
  );
}
