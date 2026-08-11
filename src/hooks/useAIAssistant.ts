import { useState } from 'react';
import { AIQueryResult } from '../types/property';
import { propertyService } from '../services/propertyService';

export function useAIAssistant() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIQueryResult | null>(null);

  const search = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q || q.trim() === '') return;

    setLoading(true);
    try {
      const res = await propertyService.searchWithAI(q);
      setResult(res);
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
