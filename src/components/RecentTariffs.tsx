import { useRecentTariffs } from '@/hooks/useTariffs';
import TariffList from './TariffList';

export default function RecentTariffs() {
  const { tariffs, loading, error } = useRecentTariffs(5);

  return (
    <TariffList
      title="Recent Tariffs"
      tariffs={tariffs}
      loading={loading}
      error={error}
    />
  );
} 