"use client";
import { useState, useEffect } from "react";
import Header from "../components/header";

export default function ResearchPaper() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center p-4 pt-25">
        {loading && (
          <div className="w-[800px] h-[1100px] animate-pulse bg-gray-500 rounded-xl"></div>
        )}
        <embed
          src="paper.pdf" // replace with your paper path
          width="800px"
          height="1100px"
          type="application/pdf"
          className={`rounded-xl ${loading ? "hidden" : "block"}`}
        />
      </div>
    </div>
  );
}
