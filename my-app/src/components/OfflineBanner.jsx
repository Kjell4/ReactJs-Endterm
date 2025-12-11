import { useState, useEffect } from 'react';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div style={styles.banner}>
      ⚠️ You are offline
    </div>
  );
};

const styles = {
  banner: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: '#ff4d4f',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    zIndex: 9999,
    fontWeight: 'bold',
  }
};

export default OfflineBanner;