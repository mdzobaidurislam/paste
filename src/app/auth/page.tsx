'use client';

import Image from 'next/image'
import MailSignIn from '@/components/Mailsignin'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import Link from 'next/link';
import HeaderCom from '@/components/HeaderCom';
import { signIn, useSession } from 'next-auth/react';

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, status } = useSession() as any;

  // Check if the session is loading or user data is undefined
  if (status === "loading") {
    // You can return a loading indicator here if needed
    return <div>Loading...</div>;
  }

  if (data || data?.user) {
    // Redirect to login or display an error if the user is not logged in
    router.push("/profile");
    return null;
  }



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!flag) { setFlag(true); }
    else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        alert("Wrong Email type");
        return;
      };

      try {
        const response = await axios.post("/api/auth/login", { email: email });
        if (response.data.success) {
          // dispatch(login({ user: response.data.user, token: response.data.token }))
          await signIn("credentials", { email: email, password: "pass" });
          // router.push("/");
        }
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }

  return (
    <div>
      <HeaderCom />
      <div className='w-fit m-auto flex flex-col items-center mt-[10vh] lg:mt-[20vh] justify-between'>
        <Link href={"/"}>
          <Image width={41} height={41} alt="standard" src="/Logo.png" className='mx-auto mb-8' />
        </Link>
        <h1 className='text-3xl'>Your PasteKing Account</h1>
        <div className='mt-6'>
          <button onClick={handleSubmit} className={`flex items-center justify-center border-blue-100 bg-white bg-opacity-15 hover:bg-blue-200 hover:bg-opacity-45 transition-all p-4 mt-4 rounded-md border w-80`}>
            Continue with Email
          </button>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your email address'
            className={`flex items-center justify-center border-blue-100 bg-white bg-opacity-15 hover:bg-blue-200 hover:bg-opacity-45  ` + (!flag ? `h-0` : ` transition-all duration-500 p-4 mt-4 rounded-md border w-80`)}
          />
          <hr className={!flag ? `mr-4 border-0` : `mt-4 mr-4 border-blue-100 transition-all duration-500`} />
          <MailSignIn value={"Continue with Google"} img_icon={"/googleicon.svg"} />
          <MailSignIn value={"Continue with Apple"} img_icon={"/appleicon.svg"} />
        </div>
      </div>
    </div>
  )
}

export default Auth