import { useState, useEffect } from "react";
import Card from "./Card.jsx";




function App() {
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    fetch("http://localhost:3000/api/cartass")
    .then((res) => {
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      setCards(data);
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let visible = cards
    .filter((card) => filter === "Todas" || card.type === filter)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));

  if (sorted) {
    visible = [...visible].sort((a, b) => b.attack - a.attack);
  }

  function pickRandom() {
    setRandomCard(cards[Math.floor(Math.random() * cards.length)]);
  }

  return (
    <main>
      <h1>A minha coleção</h1>

      <p>
        Tenho {cards.length} cartas · a mostrar {visible.length}
      </p>

      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
        <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? "Ordem original" : "Ordenar por ataque"}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar pelo nome…"
      />

      {visible.length === 0 ? (
        <p>Nenhuma carta corresponde.</p>
      ) : (
        <ul>
          {visible.map((card) => (
            <Card key={card.name} {...card} />
          ))}
        </ul>
      )}

      <h2>Carta à sorte</h2>
      <button onClick={pickRandom}>Escolher outra</button>
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque {randomCard.attack} ·
          defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}

export default App;
