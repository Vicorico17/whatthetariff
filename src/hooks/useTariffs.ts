import { useState, useEffect } from 'react';
import { supabase, Tariff } from '@/lib/supabase';

export const useTariffsByCountry = (country: string | null) => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) return;

    const fetchTariffs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching tariffs for country:', country);
        
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .eq('country', country)
          .eq('status', 'active')
          .order('effective_date', { ascending: false });

        if (error) {
          console.error('Error fetching tariffs by country:', error);
          throw error;
        }
        
        console.log('Fetched tariffs for country:', data);
        setTariffs(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        console.error('Exception in useTariffsByCountry:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTariffs();
  }, [country]);

  return { tariffs, loading, error };
};

export const useHotTariffs = (limit = 10) => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotTariffs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching hot tariffs with limit:', limit);
        
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .eq('status', 'active')
          .order('tariff_rate', { ascending: false })
          .limit(limit);

        if (error) {
          console.error('Error fetching hot tariffs:', error);
          throw error;
        }
        
        console.log('Fetched hot tariffs:', data);
        setTariffs(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        console.error('Exception in useHotTariffs:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotTariffs();
  }, [limit]);

  return { tariffs, loading, error };
};

export const useRecentTariffs = (limit = 10) => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTariffs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching recent tariffs with limit:', limit);
        
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .eq('status', 'active')
          .order('effective_date', { ascending: false })
          .limit(limit);

        if (error) {
          console.error('Error fetching recent tariffs:', error);
          throw error;
        }
        
        console.log('Fetched recent tariffs:', data);
        setTariffs(data || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        console.error('Exception in useRecentTariffs:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTariffs();
  }, [limit]);

  return { tariffs, loading, error };
}; 