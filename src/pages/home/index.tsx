import React from "react";

export default function Home() {
  return (
    <div className="min-h-[100vh] pt-20 pb-8 bg-slate-200">
      <h1 className=" text-center text-4xl font-semibold">
        Develop your own chatbot now!
      </h1>
      <div className="max-w-[960px] h-[600px] mx-auto mt-16 rounded-xl overflow-hidden">
        <iframe src="/chatbot" className="w-full h-full"></iframe>
      </div>
    </div>
  );
}
