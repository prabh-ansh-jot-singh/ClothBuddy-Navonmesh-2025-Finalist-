'use client';

import { useCartStore } from '@/data/cartData';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast.success(`Removed ${name} from cart`);
  };

  const handleUpdateQuantity = (id: number, quantity: number, name: string) => {
    updateQuantity(id, quantity);
    toast.success(`Updated ${name} quantity`);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-4 px-2 text-center mt-32 md:mt-20">
        <ShoppingBag size={64} className="text-gray-300" />
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Your Cart is Empty</h1>
        <p className="text-gray-600 text-sm md:text-base">Looks like you haven't added anything to your cart yet</p>
        <Link href="/products">
          <Button className="mt-4 text-sm md:text-base">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 mt-32 sm:px-6 lg:px-8 md:mt-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items Section */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Shopping Cart ({totalItems})</h1>
            <Button variant="ghost" onClick={clearCart} className="text-red-600 hover:text-red-700">
              Clear Cart
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex overflow-hidden items-center justify-between rounded-lg border bg-white shadow-sm"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className='w-24 h-full'>
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-2 md:items-center md:flex-row">
                    <div className=''>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 text-[13px] md:text-base">Unit Price: ₹{item.price}</p>
                      <p className="mt-1 font-medium text-gray-900 text-[13px] md:text-base">
                        Total: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center rounded-lg border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
                        >
                          <Minus color="#000" className="w-3 h-3 md:h-4 md:w-4" />
                        </Button>
                        <span className="w-12 text-center text-black text-[13px] md:text-base">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
                        >
                          <Plus color="#000" className="w-3 h-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <Trash2 className="w-3 h-3 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="font-medium text-gray-900 md:text-lg">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 md:text-base">Subtotal</p>
                <p className="text-sm font-medium text-gray-900 md:text-base">₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 md:text-base">Shipping</p>
                <p className="text-sm font-medium text-gray-900 md:text-base">₹0.00</p>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-sm font-medium text-gray-900 md:text-base">Order Total</p>
                <p className="text-sm font-medium text-gray-900 md:text-base">₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <Button className="mt-6 w-full" size="lg">
              Proceed to Checkout
            </Button>
            <Link href="/products">
              <Button style={{border: "1px solid #1b3a57"}} className="bg-white text-[#1b3a57] mt-4 w-full hover:text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
