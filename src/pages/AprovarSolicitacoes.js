import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import "../styles/AprovarSolicitacoes.css";

export default function AprovarSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "solicitacoes"),
      where("status", "==", "pendente")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));
      setSolicitacoes(lista);
    });

    return () => unsubscribe();
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    const ref = doc(db, "solicitacoes", id);
    await updateDoc(ref, {
      status: novoStatus,
      dataResposta: new Date().toISOString(),
    });
  };

  return (
    <div className="aprovacoes-container">
      <h2>Solicitações Pendentes</h2>
      {solicitacoes.length === 0 && <p>Sem solicitações no momento.</p>}
      <div className="lista-solicitacoes">
        {solicitacoes.map((sol) => (
          <div key={sol.id} className="card-solicitacao">
            <h3>{sol.titulo}</h3>
            <p>
              <strong>Valor:</strong> R$ {sol.valor}
            </p>
            <p>
              <strong>Descrição:</strong> {sol.descricao}
            </p>
            <p>
              <strong>Solicitante:</strong> {sol.solicitanteEmail}
            </p>

            <div className="botoes">
              <button
                className="btn-aprovar"
                onClick={() => atualizarStatus(sol.id, "aprovado")}
              >
                Aprovar
              </button>
              <button
                className="btn-reprovar"
                onClick={() => atualizarStatus(sol.id, "reprovado")}
              >
                Reprovar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
