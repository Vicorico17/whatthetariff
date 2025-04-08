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

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
      )}
      <div className="grid gap-4">
        {tariffs.map((tariff) => (
          <div
            key={tariff.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg dark:text-white">
                  {tariff.tariff_name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {tariff.country}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {tariff.tariff_rate}%
                </span>
              </div>
            </div>
            
            {tariff.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {tariff.description}
              </p>
            )}
            
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Effective: {new Date(tariff.effective_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 