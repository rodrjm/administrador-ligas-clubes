import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { League, Club, Match } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const api = axios.create({ baseURL: API_BASE });

// Leagues
export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: async () => {
      const { data } = await api.get<League[]>('/leagues');
      return data;
    },
  });
};

export const useLeague = (id: string) => {
  return useQuery({
    queryKey: ['league', id],
    queryFn: async () => {
      const { data } = await api.get<League>(`/leagues/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Clubs
export const useClubs = () => {
  return useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const { data } = await api.get<Club[]>('/clubs');
      return data;
    },
  });
};

export const useClub = (id: string) => {
  return useQuery({
    queryKey: ['club', id],
    queryFn: async () => {
      const { data } = await api.get<Club>(`/clubs/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Matches
export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data } = await api.get<Match[]>('/matches');
      return data;
    },
  });
};

export const useMatch = (id: string) => {
  return useQuery({
    queryKey: ['match', id],
    queryFn: async () => {
      const { data } = await api.get<Match>(`/matches/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Mutations
export const useCreateLeague = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<League>) => {
      const { data: result } = await api.post('/leagues', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
    },
  });
};

export const useCreateClub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Club>) => {
      const { data: result } = await api.post('/clubs', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
    },
  });
};

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Match>) => {
      const { data: result } = await api.post('/matches', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
};
