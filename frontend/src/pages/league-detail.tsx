import { useParams } from 'react-router-dom';
import { useLeague, useMatches } from '../hooks/use-api';
import MatchCard from '../components/match-card';

const LeagueDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: league, isLoading: leagueLoading } = useLeague(slug || '');
  const { data: matches, isLoading: matchesLoading } = useMatches();

  const leagueMatches = matches?.filter(match => match.leagueId === league?.id) || [];

  if (leagueLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!league) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Liga no encontrada</h1>
        <p className="text-gray-600">La liga que buscas no existe o ha sido eliminada.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* League Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          {league.logoUrl ? (
            <img
              src={league.logoUrl}
              alt={league.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{league.name}</h1>
            <p className="text-gray-600">Liga</p>
          </div>
        </div>
        {league.description && (
          <p className="mt-4 text-gray-700">{league.description}</p>
        )}
      </div>

      {/* Matches Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Partidos</h2>
        
        {matchesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : leagueMatches.length > 0 ? (
          <div className="space-y-3">
            {leagueMatches.map((match) => (
              <MatchCard key={match.id} match={match} isLive={match.status === 'LIVE'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No hay partidos programados para esta liga</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeagueDetail;
