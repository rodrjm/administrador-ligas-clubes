import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMatch } from '../hooks/use-api';
import { io, Socket } from 'socket.io-client';
import type { Match, Event } from '../types';

const MatchLive = () => {
  const { id } = useParams<{ id: string }>();
  const { data: match, isLoading } = useMatch(id || '');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!id) return;

    const wsUrl = import.meta.env.VITE_WS_URL || 'http://localhost:3001';
    const newSocket = io(wsUrl);
    setSocket(newSocket);

    newSocket.emit('match:join', id);

    newSocket.on('match:update', (updatedMatch: Match) => {
      // Actualizar el estado del partido si es necesario
      console.log('Match updated:', updatedMatch);
    });

    newSocket.on('event:new', (event: Event) => {
      setEvents(prev => [...prev, event]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  const addGoal = () => {
    if (!socket || !id) return;
    socket.emit('event:add', {
      matchId: id,
      type: 'GOL',
      minute: 45,
      isHome: true,
    });
  };

  const addCard = (type: 'AMARILLA' | 'ROJA') => {
    if (!socket || !id) return;
    socket.emit('event:add', {
      matchId: id,
      type,
      minute: 45,
      isHome: true,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="bg-white rounded-lg p-8">
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Partido no encontrado</h1>
        <p className="text-gray-600">El partido que buscas no existe o ha sido eliminado.</p>
      </div>
    );
  }

  const getSportIcon = (sport: string) => {
    const icons = {
      FUTBOL: '⚽',
      BASQUET: '🏀',
      HANDBALL: '🤾',
      HOCKEY: '🏒',
    };
    return icons[sport as keyof typeof icons] || '⚽';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">{getSportIcon(match.sport)}</span>
          <h1 className="text-2xl font-bold text-gray-900">{match.sport}</h1>
          {match.status === 'LIVE' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              EN VIVO
            </span>
          )}
        </div>
        {match.location && (
          <p className="text-gray-600">📍 {match.location}</p>
        )}
      </div>

      {/* Scoreboard */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-8 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Equipo Local</h2>
            <div className="text-6xl font-bold text-gray-900 font-mono">
              {match.scoreHome}
            </div>
          </div>
          <div className="px-8">
            <span className="text-4xl text-gray-400 font-mono">-</span>
          </div>
          <div className="text-center flex-1">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Equipo Visitante</h2>
            <div className="text-6xl font-bold text-gray-900 font-mono">
              {match.scoreAway}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Controles de Administración</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={addGoal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Gol
          </button>
          <button
            onClick={() => addCard('AMARILLA')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tarjeta Amarilla
          </button>
          <button
            onClick={() => addCard('ROJA')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tarjeta Roja
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Finalizar
          </button>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cronología del Partido</h3>
        <div className="space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  {event.minute ? `${event.minute}'` : 'FT'}
                </span>
                <span className="text-lg">
                  {event.type === 'GOL' && '⚽'}
                  {event.type === 'AMARILLA' && '🟨'}
                  {event.type === 'ROJA' && '🟥'}
                </span>
                <span className="text-gray-900">
                  {event.type === 'GOL' && 'Gol anotado'}
                  {event.type === 'AMARILLA' && 'Tarjeta amarilla'}
                  {event.type === 'ROJA' && 'Tarjeta roja'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No hay eventos registrados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchLive;
