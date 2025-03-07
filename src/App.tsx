import { useEffect, useState, useCallback } from 'react';
import { NewsGrid } from './components/organisms/newsGrid';
import { NewsCardDrawer } from 'src/components/molecules/drawer';
import { getPopularNews } from 'src/lib/services';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [popularNews, setPopularNews] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<any>();

  const fetchPopularNews = useCallback(async () => {
    setLoading(true);

    await getPopularNews()
      .then((res: any) => {
        setPopularNews(res?.results);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPopularNews();
  }, [fetchPopularNews]);

  useEffect(() => {
    setOpen(true);
  }, [selectedNews]);

  return (
    <div className="app">
      <NewsGrid
        news={popularNews}
        loading={loading}
        error={error}
        setSelectedNews={setSelectedNews}
        setOpen={setOpen}
      />
      {selectedNews && open && (
        <NewsCardDrawer open={open} setOpen={setOpen} selectedNews={selectedNews} />
      )}
    </div>
  );
}

export default App;
