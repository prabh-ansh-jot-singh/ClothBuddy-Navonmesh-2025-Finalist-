'use client';

import { useState } from 'react';

interface Address {
  id: number;
  type: 'HOME' | 'WORK';
  name: string;
  phone: string;
  address: string;
  pincode: number;
  locality: string;
  city: string;
  state: string;
  landmark?: string;
  alternatePhone?: string;
}

function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: 'HOME',
      name: 'Cloth Buddy',
      phone: '05180XXXXX',
      address: 'Sector-60',
      locality: 'Near Mayfield',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: 122001,
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Address | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [nextId, setNextId] = useState(2);

  const handleEdit = (id: number) => {
    const addr = addresses.find((a) => a.id === id);
    if (addr) {
      setEditingId(id);
      setAddingNew(false);
      setFormData({ ...addr });
    }
  };

  const handleAddNew = () => {
    setEditingId(null);
    setAddingNew(true);
    setFormData({
      id: nextId,
      type: 'HOME',
      name: '',
      phone: '',
      address: '',
      locality: '',
      city: '',
      state: '',
      pincode: 0,
    });
    setNextId((prev) => prev + 1);
  };

  const handleSave = () => {
    if (formData) {
      if (addingNew) {
        setAddresses((prev) => [...prev, formData]);
      } else {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === formData.id ? { ...formData } : addr))
        );
      }
      setEditingId(null);
      setAddingNew(false);
      setFormData(null);
    }
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleChange = (field: keyof Address, value: string | number) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl bg-gray-100 p-6 text-black">
      <h1 className="mb-6 text-center text-2xl font-bold">Manage Your Addresses</h1>
      <button
        onClick={handleAddNew}
        className="mb-4 w-full rounded border border-gray-400 px-4 py-2 text-black hover:text-blue-600"
      >
        + Add New Address
      </button>
      {editingId || addingNew ? (
        <div className="w-full overflow-hidden break-words rounded-lg border bg-white p-6 text-black shadow-sm">
          <h2 className="text-lg font-semibold">
            {addingNew ? 'Add New Address' : 'Edit Address'}
          </h2>
          <input
            type="text"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="Name"
            value={formData?.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <input
            type="text"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="Phone"
            value={formData?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <textarea
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="Address"
            value={formData?.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={2}
          />
          <input
            type="text"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="Locality"
            value={formData?.locality || ''}
            onChange={(e) => handleChange('locality', e.target.value)}
          />
          <input
            type="text"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="City"
            value={formData?.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
          />
          <input
            type="text"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="State"
            value={formData?.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
          />
          <input
            type="number"
            className="mt-2 block w-full rounded border p-2 text-black placeholder-black"
            placeholder="Pincode"
            value={formData?.pincode || ''}
            onChange={(e) => handleChange('pincode', Number(e.target.value))}
          />
          <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <button
              onClick={handleSave}
              className="w-full rounded border border-gray-400 px-4 py-2 text-black hover:text-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setAddingNew(false);
              }}
              className="w-full rounded border border-gray-400 px-4 py-2 text-black hover:text-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="rounded border bg-white p-4 text-black">
              <p className="font-semibold">
                {addr.name} - {addr.phone}
              </p>
              <p className="text-sm">
                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() => handleEdit(addr.id)}
                  className="rounded border px-3 py-1 text-black hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="rounded border px-3 py-1 text-black hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressPage;