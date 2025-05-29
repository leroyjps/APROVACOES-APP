import React from "react";
import Menu from "../components/Menu"; // ajuste o caminho se necessário

export default function Dashboard() {
  return (
    <div>
      <Menu />
      <div style={styles.container}>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema de aprovações.</p>
        {/* Adicione aqui os gráficos, tabelas ou cards do dashboard */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};
