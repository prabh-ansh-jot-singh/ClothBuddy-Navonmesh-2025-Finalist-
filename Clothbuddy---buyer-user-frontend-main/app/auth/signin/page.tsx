// app/auth/signin/page.tsx
'use client';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';

const Signin = () => {
  // const { signInWithGoogle } = useAuth();
  // toast('Sign in Sucessfully');

  return (
    <div className="flex min-h-screen items-center justify-center mt-28 bg-gray-100 md:mt-16">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Sign In</h2>

        <form className="mb-6 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        <div className="relative mb-6 flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="mx-4 flex-shrink text-gray-500">Or</div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          // onClick={signInWitxhGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 transition duration-200 hover:bg-gray-50"
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
          <span className="text-gray-700">Sign in with Google</span>
        </button>

        <div className="mt-6 text-center">
          <Link href="#" className="text-blue-500 hover:underline">
            Forgot your password?
          </Link>
          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
