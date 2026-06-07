"use client";
import { toast } from "sonner";
import { CircleAlert } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { ChevronRight } from 'lucide-react';
import { useState } from "react";
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

export default function AddNewAddress() {

    const [formData, setFormData] = useState(initialFormState);

    const { setDefault, addAddress, setSelected } = userAddressStore();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [makeDefault, setMakeDefault] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        setFormData(prev => ({ ...prev, id: uniqueId }));
        // Validate form fields
        let newErrors: { [key: string]: string } = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData] && key !== "landmark" && key !== "address2") {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (makeDefault) {
            setDefault(formData);
        }

        addAddress(formData);
        setSelected(formData);
        toast.success(`Address Added Successfully!`);
        setMakeDefault(false);
        
        setErrors({});
        setFormData(initialFormState);
    }

    const showError = (error: string) => {
        return (
            <p className="text-sm flex gap-1 items-center font-semibold mt-[2px] tracking-wide text-red-600"><CircleAlert size={14} strokeWidth={2} />{error}</p>
        )
    }

    return (
        <div className="w-full flex justify-center items-center text-black mt-28 md:mt-16 py-8">
            <div className="rounded-sm p-4 shadow-md w-[95%] md:w-[75%] lg:w-1/2" style={{ border: '1px solid #e6e3e3' }}>
                <div className="flex items-center gap-1">
                    <Link href={'/address'} className="text-sm tracking-wide font-semibold hover:text-[#4a6e8d]">Your Addresses</Link>
                    <ChevronRight size={12} />
                    <Link href={'address/add'} className="text-sm text-[#4a6e8d] tracking-wide font-semibold">New Address</Link>
                </div>
                <div className="flex flex-col gap-2 mt-1 py-3 rounded-sm">
                    <h4 className="flex items-center gap-1 font-semibold tracking-wide">
                        Add a New Address
                    </h4>
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 items-stretch md:flex-row">
                            <div className="flex-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.name} onChange={handleChange} type="text" name="name" id="name" placeholder="Enter your Full Name" />
                                {errors.name && showError(errors.name)}
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="phone">Mobile Number</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.phone} onChange={handleChange} type="phone" name="phone" id="phone" placeholder="Enter your Mobile Number" />
                                {errors.phone && showError(errors.phone)}
                            </div>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="address1">Address Line 1</Label>
                            <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                value={formData.address1} onChange={handleChange} type="text" name="address1" id="address1" placeholder="Flat, House No., Building, Company, Apartment" />
                            {errors.address1 && showError(errors.address1)}
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="address2">Address Line 2</Label>
                            <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                value={formData.address2} onChange={handleChange} type="text" name="address2" id="address2" placeholder="Area, Street, Village" />
                        </div>
                        <div className="flex flex-col gap-2 items-stretch md:flex-row">
                            <div className="flex-1">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.pincode} onChange={handleChange} type="string" name="pincode" id="pincode" placeholder="Enter Pincode" />
                                {errors.pincode && showError(errors.pincode)}
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="city">City</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.city} onChange={handleChange} type="text" name="city" id="city" placeholder="Enter City" />
                                {errors.city && showError(errors.city)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-stretch md:flex-row">
                            <div className="flex-1">
                                <Label htmlFor="landmark">Landmark</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.landmark} onChange={handleChange} type="text" name="landmark" id="landmark" placeholder="Enter State" />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="state">State</Label>
                                <Input className={`focus-visible:ring-0 focus-visible:outline-none`}
                                    value={formData.state} onChange={handleChange} type="text" name="state" id="state" placeholder="Enter State" />
                                {errors.state && showError(errors.state)}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm select-none flex cursor-pointer w-max items-center gap-1 font-semibold tracking-wide">
                                <Checkbox className="w-3 h-3" onCheckedChange={() => setMakeDefault((prev: boolean) => !prev)} checked={makeDefault} />
                                <span className="mt-[2px]" onClick={() => setMakeDefault((prev: boolean) => !prev)}>Set as Default Address</span>
                            </p>
                        </div>

                        <button className="w-max mt-1 px-4 transition-bg duration-200 select-none rounded-sm tracking-wide text-sm font-semibold py-2 text-white bg-[#083554] hover:bg-[#12283c]" type="submit">
                            ADD ADDRESS
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}