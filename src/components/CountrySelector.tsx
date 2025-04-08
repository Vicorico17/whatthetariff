import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CountrySelectorProps {
  onCountrySelect: (country: string) => void;
}

type TariffCountry = {
  country: string;
}

export default function CountrySelector({ onCountrySelect }: CountrySelectorProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tariffs')
          .select('country')
          .eq('status', 'active')
          .order('country');

        if (error) throw error;

        // Get unique countries
        const uniqueCountries = [...new Set((data as TariffCountry[]).map(item => item.country))];
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      
      {filteredCountries.length > 0 && search && (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700">
          {filteredCountries.map((country) => (
            <button
              key={country}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => {
                onCountrySelect(country);
                setSearch('');
              }}
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 