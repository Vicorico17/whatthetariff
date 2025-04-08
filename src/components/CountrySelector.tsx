import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface CountrySelectorProps {
  onCountrySelect: (country: string) => void;
}

export default function CountrySelector({ onCountrySelect }: CountrySelectorProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUniqueCountries = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('tariffs')
          .select('country')
          .eq('status', 'active')
          .order('country');

        if (error) throw error;

        // Get unique countries and filter out 'All Countries' as it's not a real country
        const uniqueCountries = [...new Set(data.map(item => item.country))]
          .filter(country => country !== 'All Countries')
          .sort();
        
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniqueCountries();
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
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        
        {isOpen && (filteredCountries.length > 0 || search) && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                  onClick={() => {
                    onCountrySelect(country);
                    setSearch(country);
                    setIsOpen(false);
                  }}
                >
                  {country}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Available Countries:
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.slice(0, 5).map((country) => (
            <button
              key={country}
              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => {
                onCountrySelect(country);
                setSearch(country);
                setIsOpen(false);
              }}
            >
              {country}
            </button>
          ))}
          {countries.length > 5 && (
            <span className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
              +{countries.length - 5} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 