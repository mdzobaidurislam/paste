'use client'

import React, { useState } from "react";

interface UrlModalProps {
    newUrl: string; // Type for newUrl
    setNewUrl: (url: string) => void; // Type for setNewUrl function
}

const UrlModal: React.FC<UrlModalProps> = ({ newUrl, setNewUrl }) => {
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(NEXT_PUBLIC_BASE_URL + "/" + newUrl);
            alert("Text copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
            alert("Failed to copy text.");
        }
    };
    return (
        <div className="bg-[#00000063] fixed top-0 left-0 w-[100vw] h-[100vh]">
            <div className="bg-[#ff3c87d0] rounded-lg px-3 fixed relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[40%] h-[15%] flex justify-center items-center">
                <input type="text" value={NEXT_PUBLIC_BASE_URL + "/" + newUrl} className="outline-none rounded-s-md text-black w-[80%] p-2 text-center" /><button onClick={handleCopyToClipboard} className="rounded-e-md  w-[10%] p-2 text-center bg-gray-800">copy</button>
                <span className="absolute top-1 right-4 text-gray-700 text-xl cursor-default" onClick={() => setNewUrl("")}>x</span>
            </div>
        </div>
    );
}

export default UrlModal