import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCheck,
  faUser,
  faPlus,
  faCheck,
  faTimes,
  faTrash,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

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

export default function App() {
  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem('people');
    if (saved) try { return JSON.parse(saved); } catch {};
    return defaultPeople;
  });
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  const addPerson = () => {
    if (!name.trim()) return;
    setPeople(prev => [...prev, { name: name.trim(), present: false }]);
    setName('');
  };

  const togglePresence = index => {
    setPeople(prev =>
      prev.map((p, i) =>
        i === index ? { ...p, present: !p.present } : p
      )
    );
  };

  const deletePerson = index => {
    if (window.confirm('Remover esta pessoa?')) {
      setPeople(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Criar lista filtrada com índice original
  const filteredPeople = useMemo(() =>
    people
      .map((p, i) => ({ ...p, originalIndex: i }))
      .filter(o => o.name.toLowerCase().includes(search.toLowerCase())),
    [people, search]
  );

  // Contadores
  const totalFiltered = filteredPeople.length;
  const presentAll = people.filter(p => p.present).length;
  const absentAll = people.length - presentAll;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl shadow-md">
        <div className="py-5 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Controle de Presença</h1>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <FontAwesomeIcon icon={faUserCheck} className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
        {/* Input & Search */}
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
              </div>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && addPerson()}
                placeholder="Digite o nome da pessoa"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
              />
            </div>
            <button
              onClick={addPerson}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Adicionar
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar participante"
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="text-gray-700">
            <span className="font-medium">Total Filtrado:</span>
            <span className="ml-2 font-bold">{totalFiltered}</span>
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Presentes:</span>
            <span className="ml-2 font-bold text-success-600">{presentAll}</span>
          </div>
          <div className="text-gray-700">
            <span className="font-medium">Ausentes:</span>
            <span className="ml-2 font-bold text-danger-600">{absentAll}</span>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-200">
          {filteredPeople.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">Nenhum participante encontrado</h3>
              <p className="text-gray-500">Ajuste a busca ou adicione novos participantes</p>
            </div>
          ) : (
            filteredPeople.map(person => (
              <div key={person.originalIndex} className="person-card p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{person.name}</h3>
                      <span className={`${person.present ? 'present-badge' : 'absent-badge'} status-badge`}>{person.present ? 'Presente' : 'Ausente'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePresence(person.originalIndex)}
                      className={`${person.present ? 'bg-danger-500 hover:bg-danger-600' : 'bg-success-500 hover:bg-success-600'} text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2`}
                    >
                      <FontAwesomeIcon icon={person.present ? faTimes : faCheck} />
                      {person.present ? 'Marcar Falta' : 'Marcar Presença'}
                    </button>
                    <button
                      onClick={() => deletePerson(person.originalIndex)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}