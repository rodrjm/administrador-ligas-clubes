import { useState } from 'react';
import { useMatches } from '../hooks/use-api';
import MatchCard from '../components/match-card';

const Matches = () => {
  const { data: matches, isLoading } = useMatches();
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  const filteredMatches = matches?.filter((match) => {
    switch (filter) {
      case 'live':
        return match.status === 'LIVE';
      case 'upcoming':
        return match.status === 'SCHEDULED';
      case 'finished':
        return match.status === 'FINISHED';
      default:
        return true;
    }
  }) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Partidos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nuevo Partido
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'all', label: 'Todos' },
          { key: 'live', label: 'En Vivo' },
          { key: 'upcoming', label: 'Próximos' },
          { key: 'finished', label: 'Finalizados' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} isLive={match.status === 'LIVE'} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚽</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' && 'No hay partidos'}
              {filter === 'live' && 'No hay partidos en vivo'}
              {filter === 'upcoming' && 'No hay partidos próximos'}
              {filter === 'finished' && 'No hay partidos finalizados'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' && 'Los partidos aparecerán aquí cuando se creen.'}
              {filter === 'live' && 'No hay partidos en curso en este momento.'}
              {filter === 'upcoming' && 'No hay partidos programados.'}
              {filter === 'finished' && 'No hay partidos finalizados.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
