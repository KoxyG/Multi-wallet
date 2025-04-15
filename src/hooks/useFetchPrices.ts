import { useState, useEffect } from 'react';

// Map of chain names to their CoinGecko IDs
const CHAIN_TO_COINGECKO_ID: Record<string, string> = {
  'Bitcoin': 'bitcoin',
  'Ethereum': 'ethereum',
  'Binance Chain': 'binancecoin',
  'Polygon Chain': 'matic-network',
  'Avalanche Chain': 'avalanche-2',
  'Fantom Chain': 'fantom',
  'Dogecoin': 'dogecoin',
  'Cosmos Chain': 'cosmos',
  'Near Chain': 'near',
  'Sui Chain': 'sui',
  'Sei Chain': 'sei-network',
  'Tron Chain': 'tron',
  'Solana Chain': 'solana',
  'Stellar': 'stellar',
  'OM (Mantra) Chain': 'mantra' // This might not be available on CoinGecko
};

export const useFetchPrices = (addresses: Record<string, string>) => {
  const [prices, setPrices] = useState<Record<string, { price: number, change24h: number }>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      if (Object.keys(addresses).length === 0) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Get unique IDs to fetch
        const ids = Object.keys(addresses)
          .map(chain => CHAIN_TO_COINGECKO_ID[chain])
          .filter(id => id); // Filter out undefined IDs
        
        if (ids.length === 0) {
          setIsLoading(false);
          return;
        }
        
        // Join IDs for the API request
        const idsString = ids.join(',');
        
        // Use CoinGecko API which has better CORS support
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process the response
        const newPrices: Record<string, { price: number, change24h: number }> = {};
        
        // Map the response back to our chain names
        Object.entries(addresses).forEach(([chain, _]) => {
          const id = CHAIN_TO_COINGECKO_ID[chain];
          if (id && data[id]) {
            newPrices[chain] = {
              price: data[id].usd,
              change24h: data[id].usd_24h_change || 0
            };
          }
        });
        
        setPrices(newPrices);
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError('Failed to fetch cryptocurrency prices');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrices();
    
    // Set up an interval to refresh prices every 5 minutes
    const intervalId = setInterval(fetchPrices, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [addresses]);
  
  return { prices, isLoading, error };
}; 