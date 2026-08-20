import { CurrencyCode, ExchangeRate } from '../types/property';

const STORAGE_KEY = 'syria_realestate_exchange_rates';

const DEFAULT_RATES: ExchangeRate[] = [
  {
    currencyCode: 'USD',
    rateToUsd: 1,
    symbol: '$',
    nameAr: 'دولار أمريكي',
    updatedAt: new Date().toISOString(),
  },
  {
    currencyCode: 'SYP',
    rateToUsd: 15000, // 1 USD = 15,000 SYP
    symbol: 'ل.س',
    nameAr: 'ليرة سورية',
    updatedAt: new Date().toISOString(),
  },
  {
    currencyCode: 'EUR',
    rateToUsd: 0.92, // 1 USD = 0.92 EUR
    symbol: '€',
    nameAr: 'يورو',
    updatedAt: new Date().toISOString(),
  },
];

export const exchangeRateService = {
  getRates(): ExchangeRate[] {
    if (typeof window === 'undefined') {
      return DEFAULT_RATES;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_RATES;
  },

  getRate(currency: CurrencyCode): number {
    const rates = this.getRates();
    const target = rates.find((r) => r.currencyCode === currency);
    return target ? target.rateToUsd : 1;
  },

  updateRate(currency: CurrencyCode, newRate: number): void {
    const rates = this.getRates().map((r) => {
      if (r.currencyCode === currency) {
        return {
          ...r,
          rateToUsd: newRate,
          updatedAt: new Date().toISOString(),
        };
      }
      return r;
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
    }
  },

  convertUsd(amountInUsd: number, targetCurrency: CurrencyCode): number {
    const rate = this.getRate(targetCurrency);
    return Math.round(amountInUsd * rate);
  },

  formatPrice(amountInUsd: number, currency: CurrencyCode = 'USD'): string {
    const converted = this.convertUsd(amountInUsd, currency);
    
    if (currency === 'USD') {
      return `$${converted.toLocaleString('en-US')}`;
    }
    if (currency === 'SYP') {
      return `${converted.toLocaleString('en-US')} ل.س`;
    }
    if (currency === 'EUR') {
      return `€${converted.toLocaleString('en-US')}`;
    }
    return `${converted.toLocaleString('en-US')}`;
  }
};
