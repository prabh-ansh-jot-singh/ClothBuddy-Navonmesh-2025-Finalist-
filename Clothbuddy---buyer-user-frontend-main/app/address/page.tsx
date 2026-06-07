"use client";
import { Plus } from 'lucide-react';

import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { userAddressStore } from '@/data/userAddressData';

const initialFormState = {
    name: "",
    phone: "",
    pincode: "",
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    id: "",
};

export default function Address() {


    const { removeAddress,setDefault, addAddress, setSelected, addressList, selected, defaultAddress } = userAddressStore();

    return (
        <div className="w-full flex justify-center items-center text-black mt-28 md:mt-16 py-8">
            <div className="rounded-sm p-4 shadow-md w-[95%] md:w-[75%] lg:w-[60%]" style={{ border: '1px solid #e6e3e3' }}>
                <div className="flex items-center gap-1">
                    <Link href={'address'} className="text-sm tracking-wide font-semibold text-[#4a6e8d]">Your Addresses</Link>
                    <ChevronRight size={12} />
                    <Link href={'address/add'} className="text-sm tracking-wide font-semibold hover:text-[#4a6e8d]">New Address</Link>
                </div>

                <div className="mt-2 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    <Link href={'/address/add'} style={{ border: "1px solid #bebebe" }} className="p-2 px-3 w-full rounded-md h-full flex flex-col items-center justify-center gap-2 cursor-pointer">
                        <Plus color='gray' strokeWidth={1.5} size={48} />
                        <p className='font-semibold tracking-wide text-gray-700'>Add Address</p>
                    </Link>
                    {addressList.map((item) => (
                        <div style={{ border: "1px solid #bebebe" }} className="p-2 px-3 w-full rounded-md h-full flex flex-col justify-between" key={item.id}>
                            <div className="tracking-wide font-[500]">
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-sm">{item.address1}</p>
                                {item.address2 && <p className="text-sm">{item.address2}</p>}
                                {item.landmark && <p className="text-sm">{item.landmark}</p>}
                                <p className="text-sm">{item.state}</p>
                                <p className="text-sm">{item.pincode}</p>
                                <p className="text-sm">Mobile Number: {item.phone}</p>
                            </div>
                            <div className="flex items-center mt-2 gap-2">
                                <Link className="text-[blue] text-sm font-semibold" href={'/address/edit'}>Edit</Link>
                                <Separator orientation="vertical" className="bg-gray-500 h-4" />
                                <button type="button" onClick={() => removeAddress(item.id)} className="text-[blue] text-sm font-semibold">Delete</button>
                                {
                                    defaultAddress?.id !== item.id && <>
                                        <Separator orientation="vertical" className="bg-gray-500 h-4" />
                                        <button type="button" onClick={() => setDefault(item)} className="text-[blue] text-sm font-semibold">Set as Default</button>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}