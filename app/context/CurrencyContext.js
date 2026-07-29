'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('BDT');

  useEffect(() => {
    const saved = localStorage.getItem('tourdibo_currency');
    if (saved) {
      setCurrency(saved);
    }
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tourdibo_currency', newCurrency);
    }
  };

  const rates = {
    USD: { symbol: '$', rate: 1, flag: '🇺🇸', name: 'USD' },
    BDT: { symbol: '৳', rate: 120, flag: '🇧🇩', name: 'BDT' },
    EUR: { symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'EUR' },
    GBP: { symbol: '£', rate: 0.78, flag: '🇬🇧', name: 'GBP' },
  };

  const formatPrice = (baseUsdAmount) => {
    let num = typeof baseUsdAmount === 'number' ? baseUsdAmount : parseFloat(String(baseUsdAmount).replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return baseUsdAmount;

    const currObj = rates[currency] || rates.BDT;
    const converted = Math.round(num * currObj.rate);
    return `${currObj.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency, formatPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: 'BDT',
      setCurrency: () => {},
      formatPrice: (amt) => (typeof amt === 'number' ? `৳${amt * 120}` : amt),
      rates: { BDT: { symbol: '৳', flag: '🇧🇩' } },
    };
  }
  return context;
}
