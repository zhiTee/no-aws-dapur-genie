"use client";
import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

export default function FloatingWidget(){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const handler = (e: KeyboardEvent)=>{
      if(e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return ()=>window.removeEventListener("keydown", handler);
  },[]);

  return (
    <>
      <button
        onClick={()=>setOpen(true)}
        className="fixed bottom-6 right-6 z-50 btn-primary shadow-hard"
        aria-label="Open chat"
      >
        Chat with DapurGenie
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="w-full h-full max-w-4xl max-h-[90vh] card overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-black/5 flex items-center">
              <p className="font-medium">DapurGenie</p>
              <button onClick={()=>setOpen(false)} className="ml-auto text-sm hover:underline">Close</button>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <ChatWidget />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
