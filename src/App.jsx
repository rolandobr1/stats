
import React, { useState } from 'react';

const defaultPlayer = () => ({ name: '', points: 0, fouls: 0, rebounds: 0, assists: 0 });

const Team = ({ teamName, players, onUpdatePlayer, teamIndex }) => {
  const totals = players.reduce(
    (acc, player) => {
      acc.points += player.points;
      acc.fouls += player.fouls;
      acc.rebounds += player.rebounds;
      acc.assists += player.assists;
      return acc;
    },
    { points: 0, fouls: 0, rebounds: 0, assists: 0 }
  );

  return (
    <div style={{ background: '#fff', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <h2>{teamName}</h2>
      {players.map((player, idx) => (
        <div key={idx} style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <input
            placeholder={`Jugador ${idx + 1}`}
            value={player.name}
            onChange={(e) => onUpdatePlayer(teamIndex, idx, { ...player, name: e.target.value })}
          />
          <div>
            <button onClick={() => onUpdatePlayer(teamIndex, idx, { ...player, points: player.points + 1 })}>+1 punto</button>
            <button onClick={() => onUpdatePlayer(teamIndex, idx, { ...player, fouls: player.fouls + 1 })}>Falta</button>
            <button onClick={() => onUpdatePlayer(teamIndex, idx, { ...player, rebounds: player.rebounds + 1 })}>Rebote</button>
            <button onClick={() => onUpdatePlayer(teamIndex, idx, { ...player, assists: player.assists + 1 })}>Asistencia</button>
          </div>
          <p>Puntos: {player.points} | Faltas: {player.fouls} | Rebotes: {player.rebounds} | Asistencias: {player.assists}</p>
        </div>
      ))}
      <p><strong>Total</strong> - Puntos: {totals.points} | Faltas: {totals.fouls} | Rebotes: {totals.rebounds} | Asistencias: {totals.assists}</p>
    </div>
  );
};

export default function App() {
  const [teams, setTeams] = useState([
    { name: 'Equipo 1', players: Array(5).fill(0).map(defaultPlayer) },
    { name: 'Equipo 2', players: Array(5).fill(0).map(defaultPlayer) },
  ]);

  const updatePlayer = (teamIndex, playerIndex, updatedPlayer) => {
    const newTeams = [...teams];
    newTeams[teamIndex].players[playerIndex] = updatedPlayer;
    setTeams(newTeams);
  };

  const globalTotals = teams.map(team =>
    team.players.reduce(
      (acc, player) => {
        acc.points += player.points;
        acc.fouls += player.fouls;
        acc.rebounds += player.rebounds;
        acc.assists += player.assists;
        return acc;
      },
      { points: 0, fouls: 0, rebounds: 0, assists: 0 }
    )
  );

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {teams.map((team, index) => (
          <Team
            key={index}
            teamName={team.name}
            players={team.players}
            teamIndex={index}
            onUpdatePlayer={updatePlayer}
          />
        ))}
      </div>
      <div style={{ background: '#eee', padding: '1rem', borderRadius: '8px' }}>
        <h3>Resumen del Partido</h3>
        {globalTotals.map((totals, index) => (
          <p key={index}>
            {teams[index].name} - Puntos: {totals.points} | Faltas: {totals.fouls} | Rebotes: {totals.rebounds} | Asistencias: {totals.assists}
          </p>
        ))}
      </div>
    </div>
  );
}
