import { useTariffs } from '@/hooks/useTariffs';

export default function GlobalTariffs() {
  const { tariffs, error } = useTariffs();

  if (error) {
    return <div>Error loading tariffs: {error}</div>;
  }

  if (tariffs.length === 0) {
    return <div>No tariffs found</div>;
  }

  const globalTariffs = tariffs.filter(t => t.country === 'All Countries');
  const implementedTariffs = tariffs.filter(t => t.status === 'implemented');
  const sumImplementedTariffs = implementedTariffs.reduce((sum, tariff) => sum + parseFloat(String(tariff.tariff_rate || '0')), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Global Tariffs</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">Base and additional global tariffs</p>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
        <span className="text-gray-700 dark:text-gray-300">Total Implemented Tariff Rate:</span>
        <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{sumImplementedTariffs.toFixed(1)}%</span>
      </div>
      <div className="space-y-4 mt-4">
        {globalTariffs.map((tariff) => (
          <div key={tariff.id} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/20">
            <h3 className="font-semibold text-gray-900 dark:text-white">{tariff.tariff_name}</h3>
            <span className="px-2 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {parseFloat(String(tariff.tariff_rate || '0')).toFixed(1)}%
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{tariff.description}</p>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Effective: {new Date(tariff.effective_date).toLocaleDateString()}</span>
              <span className="capitalize">Status: {tariff.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 