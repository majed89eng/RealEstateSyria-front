import { useState, useEffect, useCallback } from 'react';
import { Property, FilterOptions } from '../types/property';
import { propertyService } from '../services/propertyService';

const initialFilters: FilterOptions = {
  searchQuery: '',
  contractType: 'all',
  propertyType: 'all',
  governorate: 'الكل',
  region: 'الكل',
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: 'all',
  hasSolar: false,
  hasTaboGreen: false,
  hasElevator: false,
  sortBy: 'newest',
};

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getProperties(filters);
      setProperties(data);
    } catch (err) {
      setError('حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters((prev) => {
      // If changing governorate, reset region to 'الكل'
      if (key === 'governorate' && prev.governorate !== value) {
        return { ...prev, governorate: value as any, region: 'الكل' };
      }
      return { ...prev, [key]: value };
    });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const openPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailModalOpen(true);
  };

  const closePropertyDetail = () => {
    setIsDetailModalOpen(false);
    setSelectedProperty(null);
  };

  return {
    properties,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    selectedProperty,
    isDetailModalOpen,
    openPropertyDetail,
    closePropertyDetail,
    refresh: fetchProperties,
  };
}
