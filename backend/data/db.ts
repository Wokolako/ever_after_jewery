import fs from 'fs';
import path from 'path';

// Define unified data interfaces
export interface GemstoneData {
  id: string;
  name: string;
  category: 'Diamond' | 'Sapphire' | 'Emerald' | 'Ruby' | 'Spinel' | 'Tourmaline';
  shape: 'Emerald Cut' | 'Cushion' | 'Round Brilliant' | 'Oval' | 'Pear' | 'Asscher';
  carat: number;
  color: string;
  clarity: string;
  origin: string;
  treatment: string;
  certification: string;
  certNumber: string;
  priceUSD: number;
  pricePerCarat: number;
  dimensions: string;
  image: string;
  featured?: boolean;
  status: 'In Vault' | 'On Memo' | 'Reserved';
  description: string;
}

export interface UserData {
  id: string;
  email: string;
  passwordHash: string;
  clientName: string;
  companyName: string;
  memberId: string;
  accountRole: 'trade_partner' | 'admin' | 'jeweller';
  tier: string;
  creditLineUSD: number;
  phone: string;
  address: string;
  isVerifiedTrade: boolean;
  createdAt: string;
  savedStoneIds: string[];
  preferences: {
    notifyDrops: boolean;
    notifyMemos: boolean;
  };
}

export interface MemoData {
  id: string;
  userId: string;
  memberId: string;
  companyName: string;
  stoneId: string;
  stoneName: string;
  dateDispatched: string;
  daysRemaining: number;
  courier: string;
  tracking: string;
  declaredValueUSD: number;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface BookingData {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  specificInquiry: string;
  status: 'Confirmed' | 'Pending Review' | 'Cancelled';
  referenceNumber: string;
  createdAt: string;
}

export interface QuoteData {
  id: string;
  gemType: string;
  shape: string;
  caratMin: number;
  caratMax: number;
  targetBudget: number;
  quantity: number;
  certificationPreference: string;
  jewellerBusiness: string;
  contactEmail: string;
  notes: string;
  estimatedUnitPrice?: number;
  estimatedTotal?: number;
  status: string;
  createdAt: string;
}

export interface OrderData {
  id: string;
  userId?: string;
  memberId?: string;
  clientName: string;
  companyName: string;
  email: string;
  items: Array<{
    gemstoneId: string;
    name: string;
    carat: number;
    priceUSD: number;
    quantity: number;
  }>;
  totalUSD: number;
  paymentMethod: string;
  shippingService: string;
  status: string;
  createdAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'backend', 'data');

function ensureDataFile<T>(filename: string, defaultData: T[]): T[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[DB] Error accessing ${filename}, using in-memory default:`, err);
    return defaultData;
  }
}

function saveDataFile<T>(filename: string, data: T[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[DB] Failed to save ${filename}:`, err);
  }
}

export const db = {
  // Gemstones
  getGemstones(): GemstoneData[] {
    return ensureDataFile<GemstoneData>('gemstones.json', []);
  },
  saveGemstones(stones: GemstoneData[]): void {
    saveDataFile('gemstones.json', stones);
  },

  // Users
  getUsers(): UserData[] {
    return ensureDataFile<UserData>('users.json', []);
  },
  saveUsers(users: UserData[]): void {
    saveDataFile('users.json', users);
  },

  // Memos
  getMemos(): MemoData[] {
    return ensureDataFile<MemoData>('memos.json', []);
  },
  saveMemos(memos: MemoData[]): void {
    saveDataFile('memos.json', memos);
  },

  // Bookings
  getBookings(): BookingData[] {
    return ensureDataFile<BookingData>('bookings.json', []);
  },
  saveBookings(bookings: BookingData[]): void {
    saveDataFile('bookings.json', bookings);
  },

  // Quotes
  getQuotes(): QuoteData[] {
    return ensureDataFile<QuoteData>('quotes.json', []);
  },
  saveQuotes(quotes: QuoteData[]): void {
    saveDataFile('quotes.json', quotes);
  },

  // Orders
  getOrders(): OrderData[] {
    return ensureDataFile<OrderData>('orders.json', []);
  },
  saveOrders(orders: OrderData[]): void {
    saveDataFile('orders.json', orders);
  }
};
