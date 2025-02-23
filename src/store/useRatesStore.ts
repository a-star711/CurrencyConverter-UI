import { create } from 'zustand'; 
import { fetchRates } from '../api/getRates'; 
import { sortRates } from '../api/getSortedRates';

interface RatesStore {
  rates: Record<string, number>; 
  sortedRates: Record<string, number>;
  loading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
  setRates: (rates: Record<string, number>) => void; 
  fetchSortedRates: () => Promise<Record<string, number>>
}

const useRatesStore = create<RatesStore>((set) => ({
  rates: {}, 
  sortedRates: {},
  loading: false, 
  error: null, 

  fetchRates: async () => {
    set({ loading: true, error: null }); 
    try {
      const data = await fetchRates(); 
      console.log('store', data)
      set({ rates: data.conversion_rates, loading: false }); 
    } catch (error) {
      set({ error: 'Failed to fetch rates', loading: false }); 
      throw error;
    }
  },
  setRates: (rates: Record<string, number>) => {
    set({ rates });
  },

  fetchSortedRates: async () => {
    set({ loading: true, error: null });
    try {
      const data = await sortRates();
      set({ sortedRates: data.conversion_rates, loading: false });
      console.log('store sort', data.conversion_rates)
      return data.conversion_rates; 
    } catch (error) {
      set({ error: "Failed to fetch sorted rates", loading: false });
      throw error;
    }
  },
}));

export default useRatesStore;