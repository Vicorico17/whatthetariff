import { Tariff } from '@/lib/supabase';

// Helper function to map country names to ISO 3166-1 alpha-2 codes
// NOTE: This is a limited mapping. A library or database column is better for extensive lists.
const countryNameToCodeMap: Record<string, string> = {
  'Algeria': 'DZ',
  'Angola': 'AO',
  'All Countries': 'UN', // Using UN code for 'All Countries'
  'Bangladesh': 'BD',
  'Bosnia and Herzegovina': 'BA',
  'Botswana': 'BW',
  'Brunei': 'BN',
  'Cambodia': 'KH',
  'Cameroon': 'CM',
  'Canada': 'CA',
  'China': 'CN',
  'European Union': 'EU',
  'India': 'IN',
  'Indonesia': 'ID',
  'Japan': 'JP',
  'Malaysia': 'MY',
  'Mexico': 'MX',
  'South Korea': 'KR',
  'Switzerland': 'CH',
  'Taiwan': 'TW',
  'Thailand': 'TH',
  'United Kingdom': 'GB',
  'Vietnam': 'VN',
  // Add more mappings as needed
};

function getCountryCode(countryName: string): string | null {
  return countryNameToCodeMap[countryName] || null;
}

// Helper function to convert 2-letter code to Unicode flag emoji
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface TariffListProps {
  tariffs: Tariff[];
  loading: boolean;
  error: string | null;
  title?: string;
}

export default function TariffList({ tariffs, loading, error, title }: TariffListProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (tariffs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No tariffs found.
      </div>
    );
  }

  // Group tariffs by country
  const groupedTariffs = tariffs.reduce((acc, tariff) => {
    if (!acc[tariff.country]) {
      acc[tariff.country] = [];
    }
    acc[tariff.country].push(tariff);
    return acc;
  }, {} as Record<string, Tariff[]>);

  // Separate "All Countries" and sort others alphabetically
  const allCountriesTariffs = groupedTariffs['All Countries'];
  delete groupedTariffs['All Countries']; // Remove from main object
  const otherCountries = Object.keys(groupedTariffs).sort();

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
      )}
      
      {/* Render "All Countries" first if they exist */}
      {allCountriesTariffs && (
        <div
          key="All Countries"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            {/* Add flag logic if needed for All Countries */}
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              All Countries
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {allCountriesTariffs.map((tariff) => (
              <div key={tariff.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {tariff.tariff_name}
                    </h4>
                    {tariff.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {tariff.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {tariff.tariff_rate}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>
                    Effective: {new Date(tariff.effective_date).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span className={`capitalize font-medium ${ 
                    tariff.status === 'implemented' 
                      ? 'text-green-700 dark:text-green-400'
                      : tariff.status === 'threatened'
                      ? 'text-yellow-700 dark:text-yellow-400'
                      : 'text-gray-700 dark:text-gray-400'
                  }`}>
                    {tariff.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render other countries alphabetically */}
      {otherCountries.map((country) => {
        const countryTariffs = groupedTariffs[country];
        const countryCode = getCountryCode(country);
        const flagEmoji = countryCode ? getFlagEmoji(countryCode) : '';
        
        return (
          <div
            key={country}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              {flagEmoji && <span className="text-xl">{flagEmoji}</span>} 
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {country}
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {countryTariffs.map((tariff) => (
                <div key={tariff.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {tariff.tariff_name}
                      </h4>
                      {tariff.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {tariff.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {tariff.tariff_rate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>
                      Effective: {new Date(tariff.effective_date).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span className={`capitalize font-medium ${ 
                      tariff.status === 'implemented' 
                        ? 'text-green-700 dark:text-green-400'
                        : tariff.status === 'threatened'
                        ? 'text-yellow-700 dark:text-yellow-400'
                        : 'text-gray-700 dark:text-gray-400'
                    }`}>
                      {tariff.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
} 