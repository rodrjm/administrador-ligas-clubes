import { Link } from 'react-router-dom';
import type { Match } from '../types';

type MatchCardProps = {
  match: Match;
  isLive?: boolean;
};

const MatchCard = ({ match, isLive = false }: MatchCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSportIcon = (sport: string) => {
    const icons = {
      FUTBOL: '⚽',
      BASQUET: '🏀',
      HANDBALL: '🤾',
      HOCKEY: '🏒',
    };
    return icons[sport as keyof typeof icons] || '⚽';
  };

  const getStatusText = () => {
    if (isLive) return 'EN VIVO';
    if (match.status === 'FINISHED') return 'FINALIZADO';
    return formatDate(match.date);
  };

  return (
    <Link
      to={`/partido/${match.id}`}
      className={`block bg-white rounded-lg border-2 p-4 hover:shadow-md transition-shadow ${
        isLive ? 'border-red-200 bg-red-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getSportIcon(match.sport)}</span>
          <span className="text-sm font-medium text-gray-600">{match.sport}</span>
        </div>
        <div className="flex items-center space-x-2">
          {isLive && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
              EN VIVO
            </span>
          )}
          <span className="text-sm text-gray-500">{getStatusText()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="font-medium text-gray-900">Equipo Local</p>
              <p className="text-2xl font-bold text-gray-900">{match.scoreHome}</p>
            </div>
            <div className="px-4">
              <span className="text-gray-400 text-2xl">-</span>
            </div>
            <div className="text-center flex-1">
              <p className="font-medium text-gray-900">Equipo Visitante</p>
              <p className="text-2xl font-bold text-gray-900">{match.scoreAway}</p>
            </div>
          </div>
        </div>
      </div>

      {match.location && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          📍 {match.location}
        </div>
      )}
    </Link>
  );
};

export default MatchCard;
