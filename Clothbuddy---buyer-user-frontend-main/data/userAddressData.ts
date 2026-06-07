import { create } from "zustand";

interface Address {
    name: string;
    phone: string;
    pincode: string;
    address1: string;
    address2?: string;
    landmark?: string;
    city: string;
    state: string;
    id: string;
};

interface CounterState {
    addressList: Address[];
    defaultAddress?: Address;
    selected: Address | null;
    removeAddress: (addressId: string) => void;
    addAddress: (address: Address) => void;
    setDefault: (address: Address) => void;
    setSelected: (address: Address) => void;
}

export const userAddressStore = create<CounterState>((set, get) => ({
    addressList: [],
    selected: null,

    addAddress: (address: Address) => set({ addressList: [...get().addressList, address] }),

    removeAddress: (addressId: string) => set({ addressList: get().addressList.filter(address => address.id !== addressId), selected: get()?.selected?.id === addressId ? null : get().selected }),

    setDefault: (address: Address) => set({ defaultAddress: address }),

    setSelected: (address: Address) => set({ selected: address })

}));