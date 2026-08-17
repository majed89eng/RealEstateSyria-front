import { useState, useEffect, useCallback } from 'react';
import { Property, FilterOptions } from '../types/property';
import { propertyService } from '../services/propertyService';

const initialFilters: FilterOptions = {
  searchQuery: '',
  contractType: 'all',
  propertyType: 'all',
  governorate: 'الكل',
  region: 'الكل',
  neighborhood: 'الكل',
  minPriceUsd: undefined,
  maxPriceUsd: undefined,
  minArea: undefined,
  maxArea: undefined,
  bedrooms: 'all',
  finishingStatus: 'all',
  availabilityStatus: 'all',
  hasSolar: false,
  hasTaboGreen: false,
  hasElevator: false,
  hasGarage: false,
  hasGenerator: false,
  sortBy: 'newest',
};

export function useProperties(customFilters?: Partial<FilterOptions>) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    ...initialFilters,
    ...customFilters,
  });
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
      // If changing governorate, reset region and neighborhood
      if (key === 'governorate' && prev.governorate !== value) {
        return { ...prev, governorate: value as any, region: 'الكل', neighborhood: 'الكل' };
      }
      // If changing region, reset neighborhood
      if (key === 'region' && prev.region !== value) {
        return { ...prev, region: value as any, neighborhood: 'الكل' };
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
    setFilters,
    updateFilter,
    resetFilters,
    selectedProperty,
    isDetailModalOpen,
    openPropertyDetail,
    closePropertyDetail,
    refresh: fetchProperties,
  };
}
