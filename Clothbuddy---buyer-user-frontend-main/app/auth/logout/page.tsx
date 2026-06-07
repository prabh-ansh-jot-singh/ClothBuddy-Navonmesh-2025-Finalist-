'use client';

import { toast } from 'sonner';

const logout = () => {
  toast('Logout Sucessfully');
  return (
    <>
      <div className="h-28 w-28 bg-black">
        <button onClick={logout}>Logout</button>
        <div>hi</div>
      </div>
    </>
  );
};

export default logout;
