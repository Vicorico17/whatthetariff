import { Tariff } from '@/lib/supabase';

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

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
      )}
      
      {Object.entries(groupedTariffs).map(([country, countryTariffs]) => {
        // Calculate total tariff for active tariffs only
        const activeTariffs = countryTariffs.filter(t => t.status === 'active');
        const totalTariff = activeTariffs.reduce((sum, tariff) => sum + Number(tariff.tariff_rate), 0);
        
        return (
          <div
            key={country}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium dark:text-white">
                  {country}
                </h3>
                {activeTariffs.length > 1 && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                      Total Tariff:
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                      {totalTariff.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        tariff.status === 'active'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {tariff.tariff_rate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>
                      Effective: {new Date(tariff.effective_date).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span className={`capitalize ${
                      tariff.status === 'active' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
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