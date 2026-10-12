import { useState } from "react";

// tenta cada caminho até um carregar; se nenhum existir, mostra o que veio em "senao"
export default function ImagemReal({ caminhos, alt, senao }) {
  const [tentativa, setTentativa] = useState(0);

  if (tentativa >= caminhos.length) return senao;
  return <img src={caminhos[tentativa]} alt={alt} onError={() => setTentativa(tentativa + 1)} />;
}
