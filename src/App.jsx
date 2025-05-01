// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const defaultPeople = [
  { name: 'Salles', present: false }, { name: 'Avós', present: false },
  { name: 'Dudu', present: false }, { name: 'Rossi', present: false },
  { name: 'Isa', present: false }, { name: 'Bernardo', present: false },
  { name: 'Carlos', present: false }, { name: 'Marco', present: false },
  { name: 'Vinicius', present: false }, { name: 'Estavam', present: false },
  { name: 'Eric', present: false }, { name: 'Evellyn', present: false },
  { name: 'Felipe Koja', present: false }, { name: 'Gabriela Bovolenta', present: false },
  { name: 'Gustavo Coelho', present: false }, { name: 'Gustavo Oliveira', present: false },
  { name: 'Henry', present: false }, { name: 'Enrico', present: false },
  { name: 'Igor', present: false }, { name: 'João Soave', present: false },
  { name: 'Ana Laura', present: false }, { name: 'Leonardo', present: false },
  { name: 'Leticia', present: false }, { name: 'Luiz Gustavo', present: false },
  { name: 'Miguel Carmo', present: false }, { name: 'Milena', present: false },
  { name: 'Murilo Cordeiro', present: false }, { name: 'Murilo Justi', present: false },
  { name: 'Nathan', present: false }, { name: 'Roji', present: false },
  { name: 'Sophia', present: false }, { name: 'Vitor', present: false },
  { name: 'Yuri', present: false }, { name: 'Julia Major', present: false },
  { name: 'Isabela', present: false }
];

function App() {
  const [people, setPeople] = useState(() => {
    const stored = localStorage.getItem('people');
    try {
      const parsed = stored ? JSON.parse(stored) : null;
      return parsed && parsed.length ? parsed : defaultPeople;
    } catch {
      return defaultPeople;
    }
  });
  const [name, setName] = useState('');

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  const addPerson = () => {
    if (!name.trim()) return;
    setPeople(prev => [...prev, { name: name.trim(), present: false }]);
    setName('');
  };

  const togglePresent = idx => {
    setPeople(prev => prev.map((p, i) => i === idx ? { ...p, present: !p.present } : p));
  };

  const deletePerson = idx => {
    setPeople(prev => prev.filter((_, i) => i !== idx));
  };

  const totalPresent = people.filter(p => p.present).length;

  return (
    <div className="container">
      <header><h1>Controle de Presença</h1></header>
      <div className="input-group">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={e => e.key === 'Enter' && addPerson()}
          placeholder="Nome da pessoa"
        />
        <button onClick={addPerson}>Adicionar</button>
      </div>
      <div id="list">
        {people.map((p, i) => (
          <div key={i} className="person">
            <span>{p.name}</span>
            <span className="status">{p.present ? 'Presente' : 'Ausente'}</span>
            <div className="actions">
              <button onClick={() => togglePresent(i)} className={`toggleBtn ${p.present ? 'present' : ''}`}>
                {p.present ? 'Marcar Falta' : 'Marcar Presença'}
              </button>
              <button onClick={() => deletePerson(i)} className="deleteBtn">Apagar</button>
            </div>
          </div>
        ))}
      </div>
      <div id="summary">Total presentes: {totalPresent}</div>
    </div>
  );
}

export default App;