import { useLeagues } from '../hooks/use-api';
import { Link } from 'react-router-dom';

const Leagues = () => {
  const { data: leagues, isLoading } = useLeagues();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Ligas</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nueva Liga
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues?.map((league) => (
          <Link
            key={league.id}
            to={`/liga/${league.slug}`}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              {league.logoUrl ? (
                <img
                  src={league.logoUrl}
                  alt={league.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
                <p className="text-sm text-gray-500">Liga</p>
              </div>
            </div>
            {league.description && (
              <p className="text-gray-600 text-sm line-clamp-2">{league.description}</p>
            )}
          </Link>
        ))}
      </div>

      {leagues?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay ligas disponibles</h3>
          <p className="text-gray-500">Las ligas aparecerán aquí cuando se creen.</p>
        </div>
      )}
    </div>
  );
};

export default Leagues;
