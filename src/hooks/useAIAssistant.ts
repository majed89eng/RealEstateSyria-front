import { useState } from 'react';
import { AIQueryResult } from '../types/property';

export function useAIAssistant() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIQueryResult | null>(null);

  const search = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q || q.trim() === '') return;

    setLoading(true);
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: q }),
      });

      if (response.ok) {
        const data: AIQueryResult = await response.json();
        setResult(data);
      }
    } catch (err) {
      console.error('AI search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQuery('');
    setResult(null);
  };

  return {
    query,
    setQuery,
    loading,
    result,
    search,
    clear,
  };
}
