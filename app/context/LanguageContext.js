'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  EN: {
    searchPlaceholder: "Search your destination (e.g. Paris, Sajek)",
    wishlist: "Wishlist",
    account: "Account",
    downloadApp: "Download our Mobile App",
    becomePlanner: "Become a Planner",
    ourServices: "Our Services",
    popularTours: "Popular Tours",
    mathaNoshtoOffers: "Matha Noshto Offers!!!",
    mostVisited: "Most Visited Tours!",
    justForYou: "Just For You!",
    filter: "Filter",
    reset: "Reset",
    startingFrom: "Starting From",
    peopleVisited: "People Visited!",
    peopleShowedInterest: "People Showed Interest!",
    bookNow: "Book now",
    downloadVoucher: "Download PDF Voucher",
    viewAll: "View All >",
    tourPackages: "Tour Packages",
    visaServices: "Visa Services",
    travelGuide: "Travel Guide",
    plannerStore: "Planner Store",
  },
  BN: {
    searchPlaceholder: "আপনার গন্তব্য খুঁজুন (যেমন: প্যারিস, সাজেক)",
    wishlist: "পছন্দের তালিকা",
    account: "অ্যাকাউন্ট",
    downloadApp: "মোবাইল অ্যাপ ডাউনলোড করুন",
    becomePlanner: "প্ল্যানার হিসেবে যোগ দিন",
    ourServices: "আমাদের সেবাসমূহ",
    popularTours: "জনপ্রিয় ট্যুরসমূহ",
    mathaNoshtoOffers: "মাথা নষ্ট অফারসমূহ!!!",
    mostVisited: "সর্বাধিক পরিদর্শিত ট্যুর!",
    justForYou: "শুধুমাত্র আপনার জন্য!",
    filter: "ফিল্টার",
    reset: "রিসেট করুন",
    startingFrom: "শুরু মাত্র",
    peopleVisited: "জন ভিজিট করেছেন!",
    peopleShowedInterest: "জন আগ্রহ প্রকাশ করেছেন!",
    bookNow: "এখনই বুক করুন",
    downloadVoucher: "পিডিএফ ভাউচার ডাউনলোড",
    viewAll: "সবগুলো দেখুন >",
    tourPackages: "ট্যুর প্যাকেজ",
    visaServices: "ভিসা সার্ভিস",
    travelGuide: "ট্রাভেল গাইড",
    plannerStore: "প্ল্যানার স্টোর",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const saved = localStorage.getItem('tourdibo_lang');
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'EN' ? 'BN' : 'EN';
    setLanguage(nextLang);
    localStorage.setItem('tourdibo_lang', nextLang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['EN']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'EN',
      toggleLanguage: () => {},
      t: (k) => k,
    };
  }
  return context;
}
