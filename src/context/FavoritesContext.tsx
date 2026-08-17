'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types/property';
import { CurrencyCode } from '../types/property';
import { exchangeRateService } from '../services/exchangeRateService';

interface FavoritesContextType {
  favorites: string[]; // Property IDs
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  favoritesCount: number;

  comparisonList: Property[];
  addToComparison: (property: Property) => boolean;
  removeFromComparison: (propertyId: string) => void;
  isInComparison: (propertyId: string) => boolean;
  clearComparison: () => void;
  isComparisonModalOpen: boolean;
  setIsComparisonModalOpen: (open: boolean) => void;

  isFavoritesDrawerOpen: boolean;
  setIsFavoritesDrawerOpen: (open: boolean) => void;
  generateFavoritesWhatsAppUrl: (properties: Property[], currency: CurrencyCode) => string;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'syria_realestate_favs';
const COMPARISON_STORAGE_KEY = 'syria_realestate_compare';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<Property[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error('Error loading favorites from storage:', e);
    }
  }, []);

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(propertyId)) {
        updated = prev.filter((id) => id !== propertyId);
      } else {
        updated = [...prev, propertyId];
      }
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving favorites:', e);
      }
      return updated;
    });
  };

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  const addToComparison = (property: Property): boolean => {
    if (comparisonList.some((p) => p.id === property.id)) {
      return true;
    }
    if (comparisonList.length >= 4) {
      alert('يمكنك مقارنة 4 عقارات كحد أقصى في وقت واحد.');
      return false;
    }
    setComparisonList((prev) => [...prev, property]);
    return true;
  };

  const removeFromComparison = (propertyId: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const isInComparison = (propertyId: string) => {
    return comparisonList.some((p) => p.id === propertyId);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const generateFavoritesWhatsAppUrl = (properties: Property[], currency: CurrencyCode) => {
    const favoriteProps = properties.filter((p) => favorites.includes(p.id));
    if (favoriteProps.length === 0) return 'https://wa.me/963988123456';

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://realestate-syria.com';
    let text = `مرحباً منصة عقارات سوريا، أود الاستفسار عن قائمة العقارات المحفوظة في مفضلتي (${favoriteProps.length} عقارات):\n\n`;

    favoriteProps.forEach((p, idx) => {
      const priceStr = exchangeRateService.formatPrice(p.priceUsd, currency);
      text += `${idx + 1}. [${p.propertyCode}] ${p.title}\nالموقع: ${p.region} - ${p.governorate}\nالسعر: ${priceStr}\nالرابط: ${baseUrl}/properties/${p.slug}\n\n`;
    });

    text += `أرجو تزويدي بكافة التفاصيل ومواعيد المعاينة المتاحة. شكراً لكم.`;
    return `https://wa.me/963988123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
        comparisonList,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
        isComparisonModalOpen,
        setIsComparisonModalOpen,
        isFavoritesDrawerOpen,
        setIsFavoritesDrawerOpen,
        generateFavoritesWhatsAppUrl,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
