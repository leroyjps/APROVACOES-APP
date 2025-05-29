import React from "react";

export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Carregando...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  spinner: {
    width: 50,
    height: 50,
    border: "6px solid #ccc",
    borderTopColor: "#004080",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#004080",
    fontWeight: "bold",
  },
};
