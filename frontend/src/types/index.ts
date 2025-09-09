export type User = {
  id: string;
  email: string;
  role: 'ADMIN_APP' | 'ADMIN_LIGA' | 'ADMIN_CLUB';
  leagueId?: string;
  clubId?: string;
};

export type League = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type Club = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  leagueId?: string;
  createdAt: string;
  updatedAt: string;
};

export type Match = {
  id: string;
  leagueId?: string;
  sport: 'FUTBOL' | 'BASQUET' | 'HANDBALL' | 'HOCKEY';
  date: string;
  location?: string;
  homeTeamId: string;
  awayTeamId: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  scoreHome: number;
  scoreAway: number;
  createdAt: string;
  updatedAt: string;
};

export type Event = {
  id: string;
  matchId: string;
  minute?: number;
  quarter?: number;
  type: 'GOL' | 'AMARILLA' | 'ROJA' | 'SANCION_2M' | 'PUNTO_1' | 'PUNTO_2' | 'PUNTO_3';
  value?: number;
  playerId?: string;
  createdAt: string;
};
