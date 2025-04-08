import { useEffect } from 'react';
import { useHotTariffs } from '@/hooks/useTariffs';
import TariffList from './TariffList';
import { supabase } from '@/lib/supabase';

export default function HotTariffs() {
  const { tariffs, loading, error } = useHotTariffs(5);

  useEffect(() => {
    // Direct test of the tariffs table
    async function testTariffs() {
      try {
        console.log('Testing HotTariffs direct query...');
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .order('tariff_rate', { ascending: false })
          .limit(1);

        if (error) {
          console.error('HotTariffs direct query error:', error);
        } else {
          console.log('HotTariffs direct query success:', data);
        }
      } catch (err) {
        console.error('HotTariffs direct query exception:', err);
      }
    }
    testTariffs();
  }, []);

  if (error) {
    console.error('HotTariffs hook error:', error);
  }

  if (tariffs?.length > 0) {
    console.log('HotTariffs data loaded:', tariffs);
  }

  return (
    <TariffList
      title="Hot Tariffs"
      tariffs={tariffs}
      loading={loading}
      error={error}
    />
  );
} 