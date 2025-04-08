import { useState, useEffect, useRef } from 'react';
import { useCountries } from '@/hooks/useTariffs';

interface CountrySelectorProps {
  onCountrySelect: (country: string | null) => void;
}

const HOT_SEARCHES = ['China', 'European Union', 'Canada', 'Mexico'];

export default function CountrySelector({ onCountrySelect }: CountrySelectorProps) {
  const { countries, loading, error } = useCountries();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCountries = search
    ? countries.filter(country =>
        country.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  const handleSelectCountry = (country: string) => {
    onCountrySelect(country);
    setSearch(country);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            if (e.target.value === '') {
              onCountrySelect(null);
            }
          }}
          onFocus={() => setIsOpen(true)}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        
        {isOpen && search && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
            {error && (
               <div className="px-4 py-2 text-sm text-red-600 dark:text-red-400">
                 Error: {error}
               </div>
            )}
            {!error && loading && (
               <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                 Loading countries...
               </div>
            )}
            {!error && !loading && filteredCountries.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No matching countries found
              </div>
            )}
            {!error && !loading && filteredCountries.length > 0 && (
              filteredCountries.map((country) => (
                <button
                  key={country}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
                  onClick={() => handleSelectCountry(country)}
                  onMouseDown={(e) => e.preventDefault()}
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
          Quick Select:
        </div>
        <div className="flex flex-wrap gap-2">
          {HOT_SEARCHES.map((country) => (
            <button
              key={country}
              className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-200 dark:border-blue-800"
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 