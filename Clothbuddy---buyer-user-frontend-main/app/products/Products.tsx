'use client';
import { Heart, ShoppingBag } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/data/cartData';
import { toast } from 'sonner';
import { IProductList } from '@/types/product';
import { useWishlistStore } from '@/data/wishlistData'; // Import Wishlist Store
import { productList } from '@/constants/productData';

export default function Products({ products }: { products: IProductList[] }) {
  const router = useRouter();
  const { addItem, isItemInCart, removeItem } = useCartStore();
  const { wishlist, toggleWishlist } = useWishlistStore(); // Wishlist store

  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});

  const handleAddToCart = async (product: IProductList, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isItemInCart(product.id)) {
      try {
        setLoadingStates(prev => ({ ...prev, [product.id]: true }));
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          src: product.src,
        });
        toast.success(`Added ${product.name} to cart`);
      } finally {
        setLoadingStates(prev => ({ ...prev, [product.id]: false }));
      }
    }
    else {
      removeItem(product.id);
      toast.success(`Removed ${product.name} from cart`);
    }
  };

  const isInWishlist = (item: any) => {
    return wishlist.some((wItem) => wItem.id === item.id);
  }

  const redirectToProductDetailPage = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div style={{ zIndex: '1' }} className="flex w-full flex-col gap-2 px-2 md:p-0 md:pr-1">

      {/* PRODUCTS LIST */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList.map((item) => (
          <div onClick={() => redirectToProductDetailPage(item.id)} className="overflow-hidden cursor-pointer flex flex-col items-start group justify-center gap-1" key={item.id}>
            {/* IMAGE CONTAINER */}
            <div className="relative w-74 h-74 object-contain overflow-hidden rounded-md">
              <img
                src={item.src}
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-0 left-0 w-full max-h-0 opacity-0 bg-white transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 py-2 flex flex-col items-center justify-center gap-2">
                {!isInWishlist(item) ? <button onClick={(e) => { toggleWishlist(item); e.stopPropagation(); }} className={`flex p-1 px-2 rounded-md items-center gap-1 text-sm hover:bg-red-400 hover:text-white`} type="button">
                  <Heart size={16} />ADD TO WISHLIST
                </button> : <button onClick={(e) => { toggleWishlist(item); e.stopPropagation(); }} className={`flex p-1 px-2 rounded-md items-center gap-1 text-sm bg-red-400 text-white`} type="button">
                  <Heart size={16} />REMOVE FROM WISHLIST
                </button>}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="w-full">
              <p className="font-bold tracking-wide text-[#083554] text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                {item.name.toUpperCase()}
              </p>
              <div className='flex justify-between gap-2'>
                <div>
                  <p className="text-gray-500 font-[500] text-[13px]">SELLER: G5 MENS WEAR</p>
                  <div className="flex gap-1 items-center">
                    <p className="text-[13px] tracking-wide font-semibold">Rs.{item.price}</p>
                    <p className="text-[13px] font-[500] line-through text-gray-500">Rs.1099</p>
                    <p className="tracking-wider text-red-600 text-[11px] font-semibold">(25% OFF)</p>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={(e) => handleAddToCart(item, e)}
                        type="button" style={{ transition: '.1s color ease-in-out' }} className={`${isItemInCart(item.id) ? "text-[#083554]" : "hover:text-[#083554]"}`}>
                        <ShoppingBag strokeWidth={1.8} size={20} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isItemInCart(item.id) ? "Add to Cart" : "Remove from Cart"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
      </div>



    </div>
  );
}