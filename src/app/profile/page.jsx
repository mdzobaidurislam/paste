"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "../../components/HeaderCom";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SecurityDashboard from "@/components/SecurityDashboard/SecurityDashboard";
import Monetization from "@/components/Monetization/Monetization";
import Referrals from "@/components/Referrals/Referrals";
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";

const Premium = () => {
  // const user = useSelector((state) => state.auth);
  const [isDialogOpenSecurity, setDialogOpenSecurity] = useState(false);
  const [isDialogOpenReferral, setDialogOpenReferral] = useState(false);
  const [isDialogOpenMonetization, setDialogOpenMonetization] = useState(false);
  const router = useRouter();

  const { data, status } = useSession();

  // Check if the session is loading or user data is undefined
  if (status === "loading") {
    // You can return a loading indicator here if needed
    return <div>Loading...</div>;
  }

  if (!data || !data.user) {
    // Redirect to login or display an error if the user is not logged in
    router.push("/auth");
    return null;
  }

  const { user } = data;

  const logout = async () => {
    await signOut({
      callbackUrl: user?.isAdmin ? "/admin" : "/auth",
    });
  };

  return (
    <div>
      <Header />

      <div>
        <div className="mt-8 flex flex-col container  max-w-7xl mx-auto px-3 md:px-10">
          <div className="h-[150px] mb-14 border-b-2 border-blue-100 flex flex-col gap-1 justify-center">
            <h1 className="text-[28px]">Profile</h1>
            <p className="pb-4 text-[16px]  text-gray-300">
              Account id: user_{user?._id}
            </p>
          </div>
          <h2 className="text-[18px] mb-4">your account</h2>
          <div className="w-full flex flex-wrap lg:flex-nowrap gap-6">
            <div className="w-full lg:w-[70%] flex flex-col gap-4">
              <div className="w-full rounded-md p-3 md:p-5 flex justify-between items-center border-2 border-blue-100 ">
                <div>
                  <h3 className="text-[22px]">Security</h3>
                  <p className="text-[17px] text-gray-300">{user?.email}</p>
                </div>
                <button
                  onClick={() => setDialogOpenSecurity(true)}
                  className="text-[14px] w-[100px] p-2 px-4 border-2 border-blue-100 rounded-md transition-all duration-500 hover:bg-white hover:bg-opacity-35"
                >
                  Manage
                </button>
                <Dialog
                  open={isDialogOpenSecurity}
                  onOpenChange={setDialogOpenSecurity}
                >
                  <DialogTrigger asChild />
                  <DialogContent className="p-0 bg-transparent shadow-none border-0">
                    <SecurityDashboard
                      setDialogOpenSecurity={setDialogOpenSecurity}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full rounded-md p-3 md:p-5 flex justify-between items-center border-2 border-blue-100 ">
                <div>
                  <h3 className="text-[22px]">Monetization</h3>
                  <p className="text-[17px] text-gray-300">
                    Optimize earnings and request cashouts.
                  </p>
                </div>
                <button
                  onClick={() => setDialogOpenMonetization(true)}
                  className="text-[14px] w-[100px] p-2 px-4 border-2 rounded-md transition-all duration-500 border-blue-100 hover:bg-white hover:bg-opacity-35"
                >
                  Manage
                </button>
                <Dialog
                  open={isDialogOpenMonetization}
                  onOpenChange={setDialogOpenMonetization}
                >
                  <DialogTrigger asChild />
                  <DialogContent className="p-0 bg-transparent shadow-none border-0">
                    <Monetization setDialogOpen={setDialogOpenMonetization} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full rounded-md p-3 md:p-5 flex justify-between items-center border-2 border-blue-100 ">
                <div>
                  <h3 className="text-[22px]">Referral code</h3>
                  <p className="text-[17px] text-gray-300">
                    Earn a % of referred users.
                  </p>
                </div>
                <button
                  onClick={() => setDialogOpenReferral(true)}
                  className="text-[14px] w-[100px] p-2 px-4 border-2 rounded-md transition-all duration-500 border-blue-100 hover:bg-white hover:bg-opacity-35"
                >
                  Manage
                </button>
                <Dialog
                  open={isDialogOpenReferral}
                  onOpenChange={setDialogOpenReferral}
                >
                  <DialogTrigger asChild />
                  <DialogContent className="p-0 bg-transparent shadow-none border-0">
                    <Referrals setDialogOpen={setDialogOpenReferral} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full rounded-md p-3 md:p-5 flex justify-between items-center border-2 border-blue-100 ">
                <div>
                  <h3 className="text-[22px]">Sign out</h3>
                  <p className="text-[17px] text-gray-300">
                    Sign out of your account.
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="text-[14px] w-[100px]  rounded-md p-2 px-4 transition-all duration-500 border-2 border-blue-100 hover:bg-white hover:bg-opacity-35"
                >
                  Sign out
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[30%] flex flex-col items-center border-2 border-blue-100 p-4 rounded-md ">
              <div className="flex flex-col items-center justify-center py-10 h-[50%]">
                <Image
                  width={30}
                  height={30}
                  alt="logo"
                  src="/Logo.png"
                  className="py-4"
                />
                <p className="text-[15px] tracking-[0.5em] mb-[15px] bg-gradient-to-r from-red-800 via-red-600 to-black bg-clip-text text-transparent">
                  PASTEKING
                </p>
                <p className="text-[17px] text-gray-300">Inactive</p>
              </div>
              <div className="border-b border-blue-100 border-dotted w-[110%]"></div>
              <div className="flex flex-col items-center justify-center py-10 h-[50%] gap-4">
                <button className="text-[16px] border p-2 px-4 rounded-md border-blue-100 hover:bg-white hover:bg-opacity-30 transition-all duration-500">
                  View plans &#8594;
                </button>
                <p className="text-[17px] text-gray-300">Redeem code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
