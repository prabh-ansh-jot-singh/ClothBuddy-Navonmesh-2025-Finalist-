import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IProductList } from '@/types/product';

interface WishlistStore {
  wishlist: IProductList[];
  toggleWishlist: (product: IProductList) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          const updatedWishlist = exists
            ? state.wishlist.filter((item) => item.id !== product.id)
            : [...state.wishlist, product];

          return { wishlist: updatedWishlist };
        });
      },
    }),
    {
      name: 'wishlist-storage', // Persist wishlist to localStorage
    }
  )
);