import { Governorate } from './property';

export interface NeighborhoodPriceData {
  id: string;
  neighborhoodName: string;
  governorate: Governorate;
  avgPricePerSqmUsd: number;
  minPricePerSqmUsd: number;
  maxPricePerSqmUsd: number;
  avgApartmentPriceUsd: number;
  sixMonthChangePercent: number; // e.g. +7.5 or -2.1
  isRising: boolean;
  rentalYieldPercent: number; // e.g. 5.5%
  demandLevel: 'high' | 'very_high' | 'moderate' | 'stable';
  popularPropertyTypes: string[];
  historicalTrends: {
    month: string;
    avgPriceUsd: number;
  }[];
  description: string;
}

export interface MarketIndexOverview {
  lastUpdated: string;
  overallAveragePerSqmUsd: number;
  nationalSixMonthGrowth: number;
  mostDemandedNeighborhoods: string[];
  fastestGrowingRegions: string[];
}
