import { useMatches } from '../hooks/use-api';
import MatchCard from '../components/match-card';

const Home = () => {
  const { data: matches, isLoading } = useMatches();

  const upcomingMatches = matches?.filter(match => match.status === 'SCHEDULED').slice(0, 3) || [];
  const liveMatches = matches?.filter(match => match.status === 'LIVE').slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Próximos Partidos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Próximos Partidos</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todo →
          </button>
        </div>
        <div className="space-y-3">
          {upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay partidos próximos</p>
            </div>
          )}
        </div>
      </section>

      {/* Partidos en Vivo */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Partidos en Vivo</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Ver todo →
          </button>
        </div>
        <div className="space-y-3">
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} isLive />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay partidos en vivo</p>
            </div>
          )}
        </div>
      </section>

      {/* Mis Suscripciones (Futuro) */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Mis Suscripciones</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
          <p>Próximamente: Suscríbete a tus ligas y clubes favoritos</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
