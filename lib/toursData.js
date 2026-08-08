/**
 * lib/toursData.js
 * ====================================================
 * SINGLE SOURCE OF TRUTH for all tour data.
 * Imported by:
 *   - app/page.js (homepage sections)
 *   - app/tours/page.js (listing + filter)
 *   - app/tours/[id]/page.js (detail page)
 * ====================================================
 * price / oldPrice -> USD (formatPrice converts BDT x120)
 * prices.single / prices.couple -> BDT (shown directly on detail page)
 */

export const ALL_TOURS = [
  // LOCAL TOURS (Bangladesh)
  {
    id: 'parasailing',
    title: "Cox's Bazar : Parasailing Adventure",
    titlePrefix: "Cox's Bazar : ",
    titleSub: "Parasailing Adventure!",
    location: "Cox's Bazar",
    fullLocation: "Cox's Bazar, Bangladesh",
    country: 'Bangladesh',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Cox\'s Bazar - Dhaka',
    rating: 4.7,
    price: 180,
    oldPrice: 250,
    duration: '3 Days / 2 Nights',
    badge: '3 Days / 2 Nights',
    isOffer: true,
    isLocal: true,
    countryType: 'Single Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '4 Star',
    sightseeing: 'Sea',
    desc: "Fly high above the Bay of Bengal coastline with certified instructors and premium equipment.",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    visitedCount: '340',
    interestCount: '290',
    dates: '15 - 18 August, 2024',
    guideName: 'Rahat Chowdhury',
    guideLangs: 'English, Bengali',
    guideRating: '4.9 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    prices: { single: 21600, couple: 36000 },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'sajek',
    title: 'Sajek Valley : Cloud & Helipad Retreat',
    titlePrefix: 'Sajek Valley : ',
    titleSub: 'Cloud & Helipad Retreat',
    location: 'Sajek Valley',
    fullLocation: 'Rangamati, Bangladesh',
    country: 'Bangladesh',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Sajek - Dhaka',
    rating: 4.9,
    price: 220,
    oldPrice: 280,
    duration: '3 Days / 2 Nights',
    badge: '3 Days / 2 Nights',
    isOffer: true,
    isLocal: true,
    countryType: 'Single Country',
    packageType: 'Family',
    transportation: 'Include',
    meal: 'All Include',
    accommodation: 'Bamboo Cottage',
    sightseeing: 'Mountain',
    desc: 'Witness the sea of clouds from Helipad and Konglak Hilltop cottage with local indigenous cuisine.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    visitedCount: '410',
    interestCount: '350',
    dates: '01 - 04 September, 2024',
    guideName: 'Aronno Chakma',
    guideLangs: 'English, Bengali, Chakma',
    guideRating: '5.0 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    prices: { single: 18000, couple: 30000 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'sundarbans',
    title: 'Sundarbans : Mangrove Cruise',
    titlePrefix: 'Sundarbans : ',
    titleSub: 'Mangrove Cruise',
    location: 'Sundarbans',
    fullLocation: 'Khulna, Bangladesh',
    country: 'Bangladesh',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Sundarbans - Dhaka',
    rating: 4.8,
    price: 250,
    oldPrice: 320,
    duration: '5 Days / 4 Nights',
    badge: '5 Days / 4 Nights',
    isOffer: false,
    isLocal: true,
    countryType: 'Single Country',
    packageType: 'Group',
    transportation: 'Partial Include',
    meal: 'All Include',
    accommodation: 'Ship',
    sightseeing: 'Forest',
    desc: "Explore Kotka beach and Harbaria wild forest inside the world's largest mangrove forest.",
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    visitedCount: '320',
    interestCount: '280',
    dates: '10 - 15 October, 2024',
    guideName: 'Karim Molla',
    guideLangs: 'English, Bengali',
    guideRating: '4.8 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    prices: { single: 30000, couple: 52000 },
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'sylhet',
    title: 'Sylhet : Ratargul & Jaflong Escaped',
    titlePrefix: 'Sylhet : ',
    titleSub: 'Ratargul & Jaflong Escaped',
    location: 'Sylhet',
    fullLocation: 'Sylhet, Bangladesh',
    country: 'Bangladesh',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Sylhet - Dhaka',
    rating: 4.6,
    price: 120,
    oldPrice: 160,
    duration: '3 Days / 2 Nights',
    badge: '3 Days / 2 Nights',
    isOffer: true,
    isLocal: true,
    countryType: 'Single Country',
    packageType: 'Family',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '3 Star',
    sightseeing: 'Nature',
    desc: 'Explore freshwater swamp forest by wooden boat and clear tea gardens of Sreemangal.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    visitedCount: '210',
    interestCount: '189',
    dates: '10 - 12 July, 2024',
    guideName: 'Tanvir Ahmed',
    guideLangs: 'English, Bengali, Sylheti',
    guideRating: '4.8 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    prices: { single: 14400, couple: 24000 },
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'saintmartin',
    title: 'Saint Martin : Coral Island Camp',
    titlePrefix: 'Saint Martin : ',
    titleSub: 'Coral Island Beach Camp',
    location: 'Saint Martin',
    fullLocation: 'Saint Martin, Bangladesh',
    country: 'Bangladesh',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Saint Martin - Dhaka',
    rating: 4.8,
    price: 195,
    oldPrice: 240,
    duration: '4 Days / 3 Nights',
    badge: '4 Days / 3 Nights',
    isOffer: false,
    isLocal: true,
    countryType: 'Single Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Dinner',
    accommodation: 'Tent',
    sightseeing: 'Sea',
    desc: 'Bicycle ride on Chera Dwip, night beach camp bonfire and fresh sea seafood dinner.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    visitedCount: '280',
    interestCount: '310',
    dates: '20 - 23 October, 2024',
    guideName: 'Zubair Hossain',
    guideLangs: 'English, Bengali',
    guideRating: '4.9 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    prices: { single: 16500, couple: 28000 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  // INTERNATIONAL TOURS
  {
    id: 'paris',
    title: 'Paris : City of Love Tour',
    titlePrefix: 'Paris : ',
    titleSub: 'City of Love',
    location: 'Paris',
    fullLocation: 'Paris, France',
    country: 'France',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Paris - Dhaka',
    rating: 5.0,
    price: 290,
    oldPrice: 350,
    duration: '7 Days / 6 Nights',
    badge: '7 Days / 6 Nights',
    isOffer: true,
    isLocal: false,
    countryType: 'Multi - Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '5 Star',
    sightseeing: 'City',
    desc: 'Full access Eiffel Tower pass, Seine River cruise, Louvre museum guided walkthrough.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    visitedCount: '3,200',
    interestCount: '420',
    dates: '27 - 29 June, 2024',
    guideName: 'Hasan Chowdhury',
    guideLangs: 'English, Bengali, French',
    guideRating: '4.9 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    prices: { single: 34800, couple: 62400 },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'dubai',
    title: 'Dubai : Skyline & Desert Safari',
    titlePrefix: 'Dubai : ',
    titleSub: 'Skyline & Desert Safari',
    location: 'Dubai',
    fullLocation: 'Dubai, UAE',
    country: 'UAE',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Dubai - Dhaka',
    rating: 4.8,
    price: 320,
    oldPrice: 400,
    duration: '4 Days / 3 Nights',
    badge: '4 Days / 3 Nights',
    isOffer: true,
    isLocal: false,
    countryType: 'Multi - Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'Breakfast',
    accommodation: '5 Star',
    sightseeing: 'City',
    desc: 'Burj Khalifa top floor, desert safari with quad biking, dhow cruise on Dubai Creek.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    visitedCount: '1,450',
    interestCount: '890',
    dates: '10 - 14 November, 2024',
    guideName: 'Ahmed Al Rashid',
    guideLangs: 'English, Arabic, Bengali',
    guideRating: '4.9 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    prices: { single: 38400, couple: 72000 },
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  {
    id: 'switzerland',
    title: 'Switzerland : Swiss Alps & Lake Geneva',
    titlePrefix: 'Switzerland : ',
    titleSub: 'Swiss Alps & Lake Geneva Escape',
    location: 'Zurich',
    fullLocation: 'Zurich, Switzerland',
    country: 'Switzerland',
    startingCountry: 'Bangladesh',
    startingPoint: 'Dhaka',
    transportRoute: 'Dhaka - Zurich - Dhaka',
    rating: 4.9,
    price: 450,
    oldPrice: 520,
    duration: '5 Days / 4 Nights',
    badge: '5 Days / 4 Nights',
    isOffer: false,
    isLocal: false,
    countryType: 'Multi - Country',
    packageType: 'Couple',
    transportation: 'Include',
    meal: 'All Include',
    accommodation: '5 Star',
    sightseeing: 'Mountain',
    desc: 'Jungfraujoch glacier trip, Lake Geneva cruise, Interlaken sky adventures and Grindelwald hikes.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    visitedCount: '980',
    interestCount: '650',
    dates: '05 - 10 December, 2024',
    guideName: 'Hans Mueller',
    guideLangs: 'English, German, Bengali',
    guideRating: '5.0 Verified Guide',
    guideAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    prices: { single: 54000, couple: 96000 },
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
];

// Backward-compatible alias map
export const TOUR_ID_ALIASES = {
  'tour-1': 'parasailing',
  'tour-2': 'sajek',
  'tour-3': 'sundarbans',
  'tour-4': 'paris',
  'tour-5': 'sylhet',
  'tour-6': 'saintmartin',
  'coxsbazar': 'parasailing',
  '1': 'parasailing',
  '2': 'sajek',
  '3': 'sundarbans',
};

export function resolveId(rawId) {
  if (!rawId) return 'paris';
  const lower = rawId.toLowerCase();
  return TOUR_ID_ALIASES[lower] || lower;
}

export function getCustomPackages() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('tour_dibo_custom_packages');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const fallbackImg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
    return parsed.map((item) => {
      const cleanImg = (item.image && !item.image.startsWith('blob:')) ? item.image : fallbackImg;
      const cleanImages = (item.images && Array.isArray(item.images) && item.images.length > 0)
        ? item.images.map(img => (img && !img.startsWith('blob:')) ? img : fallbackImg)
        : [cleanImg];
      return {
        ...item,
        image: cleanImg,
        images: cleanImages,
      };
    });
  } catch (e) {
    return [];
  }
}

export function getAllToursWithCustom() {
  const custom = getCustomPackages();
  return [...custom, ...ALL_TOURS];
}

export function getTourById(rawId) {
  const id = resolveId(rawId);
  const all = getAllToursWithCustom();
  return all.find((t) => t.id === id) || all.find((t) => t.id === 'paris') || ALL_TOURS[0];
}

export const MOST_VISITED_TOURS = ALL_TOURS.filter((t) =>
  ['dubai', 'paris', 'switzerland'].includes(t.id)
);

export const POPULAR_TOURS = [...ALL_TOURS]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

export const JUST_FOR_YOU_TOURS = ALL_TOURS.filter((t) =>
  ['sylhet', 'parasailing', 'sajek', 'saintmartin', 'paris', 'sundarbans'].includes(t.id)
);
