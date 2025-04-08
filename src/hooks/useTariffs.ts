import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tariff } from '@/lib/supabase';

const supabaseUrl = 'https://puichfxnrloxdgpxnlvv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1aWNoZnhucmxveGRncHhubHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNDA4MTksImV4cCI6MjA1OTcxNjgxOX0.ZCEO2bTFgNruIhJalABt8D1_oBbxA-F5synvV8rci-U';
const supabase = createClient(supabaseUrl, supabaseKey);

export function useTariffsByCountry(country: string | null) {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!country) {
      setTariffs([]);
      setError(null);
      return;
    }
    
    const fetchTariffs = async () => {
      console.log('Querying tariffs for country:', country);
      const { data, error } = await supabase
        .from('tariffs')
        .select('*')
        .eq('country', country);

      if (error) {
        console.error('Error fetching tariffs:', error);
        setError(error.message);
      } else {
        console.log('Fetched tariffs:', data);
        setTariffs(data || []);
      }
    };

    fetchTariffs();
  }, [country]);

  return { tariffs, error };
}

export const useHotTariffs = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotTariffs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching all hot tariffs...');
        
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .eq('status', 'implemented')
          .order('tariff_rate', { ascending: false });

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
  }, []);

  return { tariffs, loading, error };
};

export const useRecentTariffs = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTariffs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching all recent tariffs...');
        
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .eq('status', 'implemented')
          .order('effective_date', { ascending: false });

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
  }, []);

  return { tariffs, loading, error };
};

export function useTariffs() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTariffs = async () => {
      const { data, error } = await supabase
        .from('tariffs')
        .select('*')
        .eq('country', 'All Countries'); // Adjust conditions as needed

      if (error) {
        console.error('Error fetching tariffs:', error);
        setError(error.message);
      } else {
        console.log('Fetched tariffs:', data);
        setTariffs(data || []);
      }
    };

    fetchTariffs();
  }, []);

  return { tariffs, error };
}

export function useCountries() {
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching distinct countries...');

        // Fetch all country values
        const { data, error } = await supabase
          .from('tariffs')
          .select('country');

        if (error) {
          console.error('Error fetching countries:', error);
          throw error;
        }

        if (data) {
          // Deduplicate the country names and sort them
          const distinctCountries = [
            ...new Set(data.map((item) => item.country)),
          ].sort() as string[];
          console.log('Fetched distinct countries:', distinctCountries);
          setCountries(distinctCountries);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        console.error('Exception in useCountries:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
} 