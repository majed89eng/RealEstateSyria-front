'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, ExchangeRate } from '../types/property';
import { exchangeRateService } from '../services/exchangeRateService';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  rates: ExchangeRate[];
  formatPrice: (amountInUsd: number, overrideCurrency?: CurrencyCode) => string;
  convertPrice: (amountInUsd: number, targetCurrency?: CurrencyCode) => number;
  refreshRates: () => void;
  updateRate: (currency: CurrencyCode, rate: number) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [rates, setRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    // Load saved currency preference from localStorage
    const saved = localStorage.getItem('syria_realestate_user_currency') as CurrencyCode;
    if (saved && (saved === 'USD' || saved === 'SYP' || saved === 'EUR')) {
      setCurrencyState(saved);
    }
    setRates(exchangeRateService.getRates());
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('syria_realestate_user_currency', code);
    }
  };

  const refreshRates = () => {
    setRates(exchangeRateService.getRates());
  };

  const updateRate = (targetCurrency: CurrencyCode, rate: number) => {
    exchangeRateService.updateRate(targetCurrency, rate);
    refreshRates();
  };

  const formatPrice = (amountInUsd: number, overrideCurrency?: CurrencyCode) => {
    const target = overrideCurrency || currency;
    return exchangeRateService.formatPrice(amountInUsd, target);
  };

  const convertPrice = (amountInUsd: number, targetCurrency?: CurrencyCode) => {
    const target = targetCurrency || currency;
    return exchangeRateService.convertUsd(amountInUsd, target);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        formatPrice,
        convertPrice,
        refreshRates,
        updateRate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
