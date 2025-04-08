"use client";

import { useState, useEffect } from 'react';
import { useTariffsByCountry } from '@/hooks/useTariffs';
import CountrySelector from '@/components/CountrySelector';
import TariffList from '@/components/TariffList';
import HotTariffs from '@/components/HotTariffs';
import RecentTariffs from '@/components/RecentTariffs';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [connectionTest, setConnectionTest] = useState<string>('Testing connection...');
  const [debugInfo, setDebugInfo] = useState<string>('Loading debug info...');
  const { tariffs, error } = useTariffsByCountry(selectedCountry);

  useEffect(() => {
    // Debug environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setDebugInfo(`
      URL defined: ${Boolean(supabaseUrl)}
      Key defined: ${Boolean(supabaseKey)}
    `);

    async function testConnection() {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase
          .from('tariffs')
          .select('*')
          .limit(1);
        
        console.log('Supabase response:', { data, error });
        
        if (error) {
          setConnectionTest(`Connection Error: ${error.message}`);
          console.error('Supabase error:', error);
        } else {
          setConnectionTest(`Connected to Supabase! Found ${data ? data.length : 0} records`);
          console.log('Supabase data:', data);
        }
      } catch (err) {
        console.error('Supabase connection error:', err);
        setConnectionTest(`Connection Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
    testConnection();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            WhatTheTariff
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Explore current U.S. tariffs by country
          </p>
          <div className="text-sm bg-blue-100 dark:bg-blue-900 p-2 rounded mb-2">
            {connectionTest}
          </div>
          <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono whitespace-pre">
            {debugInfo}
          </div>
        </header>

        <div className="max-w-3xl mx-auto mb-12">
          <CountrySelector onCountrySelect={setSelectedCountry} />
        </div>

        {selectedCountry && (
          <div className="mb-12">
            <TariffList
              title={`Tariffs for ${selectedCountry}`}
              tariffs={tariffs}
              loading={false}
              error={error}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <HotTariffs />
          <RecentTariffs />
        </div>
      </div>
    </main>
  );
}
