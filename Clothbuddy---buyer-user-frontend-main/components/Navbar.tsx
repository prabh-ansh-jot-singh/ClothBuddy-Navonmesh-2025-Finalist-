'use client';
import { MapPinOff, ShoppingBag, Heart, Search, MapPin, LayoutGrid, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from '@/data/cartData';
import { useWishlistStore } from '@/data/wishlistData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { userAddressStore } from '@/data/userAddressData';

export default function Navbar() {
  const { totalItems } = useCartStore();
  const { wishlist } = useWishlistStore();
  const { addressList, selected, setSelected } = userAddressStore();
  const router = useRouter();

  const [addressDialog, setAddressDialog] = useState(false);
  const [selectedType, setSelectedType] = useState('men');
  const [isHovered, setIsHovered] = useState(false);
  const [tm, setTm] = useState(null);


  const toggleMegaMenu = () => {

    if (tm) clearTimeout(tm);
    setTimeout(() => {
      setIsHovered(prev => !prev);
    }, 100)

  }
  const redirect = (route: string) => router.push(route);

  const formatAddress = (address: any) => {
    return (
      <p className='text-sm leading-5 tracking-wide font-[500]'>
        <span className='font-semibold'>{address.name} -</span>
        <span>&nbsp;{address.address1}</span>
        {address.address2 && (<span>,&nbsp;{address.address2}</span>)}
        {address.landmark && (<span>,&nbsp;{address.landmark}</span>)}
        <span>,&nbsp;{address.state}</span>
        <span>&nbsp;{address.pincode}</span>
      </p>
    )
  }

  return (
    <nav className="fixed top-0 left-0 z-[999] w-full bg-white px-4 py-2 shadow-md md:py-1 md:px-6">
      <div className="flex items-stretch justify-between w-full md:gap-4">
        {/* Logo */}
        <Link href="/men" className="flex items-center">
          <img className="w-14 lg:h-14 lg:w-18 lg:h-18" src="/clothbuddy_logo.png" alt="ClothBuddy Logo" />
          <p className="hidden text-lg font-semibold text-black sm:block lg:text-xl">ClothBuddy</p>
        </Link>

        {/* Search & Location */}
        <div className="flex flex-1 items-center gap-6">
          {/* Location */}
          <div className="hidden items-center gap-1 md:flex">
            <MapPin size={22} className="text-black" />
            <div className="flex flex-col items-start max-w-[175px] overflow-hidden">
              <p className="text-[11px] italic w-full text-black text-ellipsis overflow-hidden whitespace-nowrap font-semibold lg:text-[13px] ">
                {selected ? selected.address1 : "Delivering to your Doorstep"}
              </p>
              {/* ADDRESS DIALOG BOX */}
              <Dialog open={addressDialog} onOpenChange={setAddressDialog}>
                <DialogTrigger asChild>
                  <button onClick={() => setAddressDialog(true)} className="text-[11px] text-[#1b3a57] hover:text-[#4a6e8d] lg:text-[12px]">Update Location</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      <p className="text-black">Choose your Delivery Location</p>
                    </DialogTitle>
                  </DialogHeader>
                  <div className='flex flex-col gap-2'>
                    {
                      addressList.length > 0 ?
                        <div>
                          <p className='text-gray-800 text-[12px]'>
                            Select a delivery location to see product availability and delivery options
                          </p>
                          <div className='flex flex-col gap-3 items-stretch mt-1 mb-2'>
                            {
                              addressList.map((item) => (
                                <button
                                  type="button"
                                  onClick={() => setSelected(item)}
                                  key={item.id}
                                  className={`text-black text-left rounded-sm p-2 border ${selected?.id === item.id ? "border-blue-500" : "border-gray-400"
                                    } hover:border-blue-500`}
                                >
                                  {formatAddress(item)}
                                </button>
                              ))
                            }
                          </div>
                          <Link onClick={() => setAddressDialog(false)} className='text-blue-800 font-[500] text-sm tracking-wide' href={'/address'}>Add a new address</Link>
                        </div>
                        :
                        <div className='flex flex-col items-center justify-center gap-4 mt-1'>
                          <p className='text-gray-400'>
                            <MapPinOff strokeWidth={1} size={96} />

                          </p>
                          <p className='text-gray-700 tracking-wide font-semibold text-center text-[15px]'>
                            Oops! Looks like you haven’t added an address yet.
                          </p>
                          <Link onClick={() => setAddressDialog(false)} className='text-blue-800 font-semibold' href={'/address/add'}>Let’s add one now!</Link>
                        </div>
                    }
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* Search Bar */}
          <div className="hidden md:flex items-center min-w-[250px] lg:min-w-[450px] border border-gray-400 rounded-sm">
            <input className="w-full px-2 text-[13px] text-black outline-none" placeholder="Search in ClothBuddy" />
            <button className="p-2 bg-[#4a6e8d] border-l border-[#4a6e8d] flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-stretch gap-6 lg:gap-8">
          <div className="relative group">
            <button
              onMouseEnter={toggleMegaMenu}
              onMouseLeave={toggleMegaMenu}
              className="hidden select-none h-full md:flex items-center gap-1 text-black"
              type="button"
            >
              <LayoutGrid size={18} />
              <p className="text-sm tracking-wide md:text-base">Categories</p>
            </button>

            {/* Dropdown Menu */}
            <div
              onMouseEnter={toggleMegaMenu}
              onMouseLeave={toggleMegaMenu}
              className={`absolute -left-[410px] lg:-left-[390px] top-[54px] lg:top-[52px] mt-2 w-[700px] text-black bg-white border border-gray-200 rounded-bl-md rounded-br-md p-4 transition-all duration-300 ease-in-out transform ${isHovered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[-10px] scale-95 pointer-events-none"
                }`}
            >
              <div className="flex flex-col gap-1">
                <div className='flex items-center gap-4'>
                  <button onClick={() => setSelectedType('men')} className={`px-2 py-1 rounded-sm tracking-wide ${selectedType === "men" && "text-white bg-[#073453]"}`} type="button">MEN</button>
                  <button onClick={() => setSelectedType('women')} className={`px-2 py-1 rounded-sm tracking-wide ${selectedType === "women" && "text-white bg-[#073453]"}`} type="button">WOMEN</button>
                  <button onClick={() => setSelectedType('kids')} className={`px-2 py-1 rounded-sm tracking-wide ${selectedType === "kids" && "text-white bg-[#073453]"}`} type="button">KIDS</button>
                </div>
                <hr className='mt-1' />

                {selectedType === 'men' && (
                  <div className='text-black grid grid-cols-3 gap-y-2'>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>TOP WEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">T-Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jackets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Polos</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shirts</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>BOTTOM WEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Pants & Trousers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shorts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Joggers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jeans</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Cargos & Parachutes</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>CO-ORDS</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Hoodies</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shirts</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>ATHLEISURE</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Track Pants</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shorts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jackets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">T-Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Tanks</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>SLEEPWEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Bottoms</li>
                      </ul>
                    </div>
                  </div>
                )}
                {selectedType === 'women' && (
                  <div className='text-black grid grid-cols-3 gap-y-2'>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>TOP WEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">T-Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Tops</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Polos</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Sweaters</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Cardigans & Shrugs</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>BOTTOM WEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Pants & Trousers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shorts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Skirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Joggers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jeans</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Cargos & Parachutes</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>INNERWEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Bras</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shapewear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Sets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Panties</li>
                      </ul>
                    </div>

                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>DRESSES</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Maxi</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Midi</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Mini</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Bodycon</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>ETHNIC & FUSION WEAR</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Kurtis</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Kurtis Set</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>CO-ORDS</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Tops</li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedType === 'kids' && (
                  <div className='text-black grid grid-cols-3 gap-y-2'>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>BOYS</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">T-Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shirts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Shorts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jeans</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Trousers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Clothing Sets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Ethnic Wear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Track Pants</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Party Wear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Innerwear & Thermals</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>GIRLS</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Dresses</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Tops</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Clothing Sets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Kurta Sets</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Party Wear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Skirts & Shorts</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Leggings</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Jeans, Trousers & Capris</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Nightwear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Innerwear & Thermals</li>
                      </ul>
                    </div>
                    <div>
                      <p className='tracking-wide text-[#4a6e8d] font-semibold'>INFANTS</p>
                      <ul className='mt-1 flex flex-col gap-1'>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">BodySuits</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Diapers</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Winter wear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Innerwear & Sleepwear</li>
                        <li className="ml-2 tracking-wider text-sm cursor-pointer hover:text-blue-600">Infant Care</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type='button' onClick={() => redirect('/wishlist')} className='text-black flex flex-col justify-center items-center gap-1'>
            <div className="relative">
              <Heart size={20} className="text-black" />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 flex items-center justify-center w-3 h-3 md:w-4 md:h-4 text-[9px] font-bold text-white bg-red-500 rounded-full">{wishlist.length}</span>}
            </div>
            <p className='text-[11px] tracking-wide font-semibold'>Wishlist</p>
          </button>
          <button type='button' onClick={() => redirect('/cart')} className='text-black flex flex-col justify-center items-center gap-1'>
            <div className="relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 flex items-center justify-center w-3 h-3 md:w-4 md:h-4 text-[9px] font-bold text-white bg-red-500 rounded-full">{totalItems}</span>}
            </div>
            <p className='text-[11px] tracking-wide font-semibold'>Bag</p>
          </button>

          <button type='button' onClick={() => router.push('/auth/signin')} className='text-black flex flex-col justify-center items-center gap-1'>
            <User size={21} />
            <p className='text-[11px] tracking-wide font-semibold'>Profile</p>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex items-center w-full mt-1 border border-gray-400 rounded-sm md:hidden">
        <button className="p-2 bg-[#4a6e8d] border-r border-[#4a6e8d] flex items-center justify-center">
          <Search className="w-4 h-4 text-white" />
        </button>
        <input className="w-full px-2 text-[13px] text-black outline-none" placeholder="Search in ClothBuddy" />
      </div>
    </nav >
  );
}