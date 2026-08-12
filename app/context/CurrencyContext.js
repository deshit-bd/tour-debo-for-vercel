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

  // Exchange rates relative to base currency BDT (Bangladeshi Taka)
  const rates = {
    BDT: { symbol: '৳', rate: 1, flag: '🇧🇩', name: 'BDT', label: 'BD' },
    USD: { symbol: '$', rate: 1 / 120, flag: '🇺🇸', name: 'USD', label: 'US' },
    EUR: { symbol: '€', rate: 1 / 130, flag: '🇪🇺', name: 'EUR', label: 'EU' },
    GBP: { symbol: '£', rate: 1 / 150, flag: '🇬🇧', name: 'GBP', label: 'GB' },
  };

  const currObj = rates[currency] || rates.BDT;

  // Smartly get base BDT value whether input is USD (<1000), BDT (>=1000), or formatted string ("৳24,000" / "$200")
  const getBaseBdt = (val) => {
    if (val === undefined || val === null || val === '') return 0;
    let num;
    if (typeof val === 'number') {
      num = val;
    } else {
      const str = String(val).trim();
      const isDollar = str.startsWith('$');
      const cleanStr = str.replace(/,/g, '');
      const matches = cleanStr.match(/-?\d+(\.\d+)?/);
      if (!matches) return 0;
      num = parseFloat(matches[0]);
      if (isDollar) return Math.round(num * 120);
    }
    if (isNaN(num)) return 0;
    // If raw number is less than 1000, treat as USD base (e.g. 180 USD -> 21,600 BDT)
    if (num > 0 && num < 1000) {
      return Math.round(num * 120);
    }
    return Math.round(num);
  };

  const convertAmount = (val) => {
    const baseBdt = getBaseBdt(val);
    return Math.round(baseBdt * currObj.rate);
  };

  const formatPrice = (val, showCode = false) => {
    if (val === undefined || val === null || val === '') return '';
    
    // If input is non-numeric string that doesn't contain digits, return as-is
    const strVal = String(val).trim();
    if (isNaN(parseFloat(strVal.replace(/[^0-9.]/g, '')))) {
      return strVal;
    }

    const baseBdt = getBaseBdt(val);
    const converted = Math.round(baseBdt * currObj.rate);
    const formattedNum = converted.toLocaleString();

    if (showCode) {
      return `${currObj.symbol}${formattedNum} ${currObj.name}`;
    }
    return `${currObj.symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: changeCurrency,
      formatPrice,
      convertAmount,
      symbol: currObj.symbol,
      rate: currObj.rate,
      rates,
    }}>
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
      formatPrice: (amt) => (typeof amt === 'number' ? `৳${amt.toLocaleString()}` : amt),
      convertAmount: (amt) => (typeof amt === 'number' ? amt : 0),
      symbol: '৳',
      rate: 1,
      rates: {
        BDT: { symbol: '৳', rate: 1, flag: '🇧🇩', name: 'BDT', label: 'BD' },
        USD: { symbol: '$', rate: 1 / 120, flag: '🇺🇸', name: 'USD', label: 'US' },
        EUR: { symbol: '€', rate: 1 / 130, flag: '🇪🇺', name: 'EUR', label: 'EU' },
        GBP: { symbol: '£', rate: 1 / 150, flag: '🇬🇧', name: 'GBP', label: 'GB' },
      },
    };
  }
  return context;
}
