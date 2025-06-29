import React from "react";
import { useNavigate } from "react-router-dom";
import wallet from "../wallet.png";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 shadow-md bg-white">
        <div className="flex items-center gap-3">
          <img src={wallet} alt="logo" className="w-12 h-12 rounded-full shadow-md" />
          <span className="text-3xl font-extrabold text-blue-700 tracking-tight font-sans">
            Finalyze
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="px-5 py-2 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-10 py-20">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 leading-tight">
            <span className="block mb-2">Analyze Your Spending,</span>
            <span className="text-red-500">Optimize Your Financial Life</span>
          </h1>
          <p className="mt-6 text-lg text-blue-900">
            Finalyze helps you track, visualize, and understand your personal finances with clarity and ease.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Demo Login
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={wallet}
              alt="Wallet Illustration"
              className="w-[320px] rounded-xl shadow-xl border-4 border-blue-700"
            />
            <div className="absolute bottom-4 right-4 bg-red-500 px-3 py-1 text-white text-xs rounded-full shadow">
              Finance Made Simple
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
          {[
            {
              title: "Real-Time Insights",
              color: "bg-blue-600",
              icon: (
                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
              ),
              desc: "Stay on top of your spending with live transaction updates and analytics.",
            },
            {
              title: "Data Privacy First",
              color: "bg-red-500",
              icon: (
                <path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              ),
              desc: "Your financial data is fully encrypted and stored securely — only you can access it.",
            },
            {
              title: "Powerful Visualizations",
              color: "bg-blue-600",
              icon: (
                <path d="M9 17v-2a4 4 0 014-4h4" strokeLinecap="round" strokeLinejoin="round" />
              ),
              desc: "Understand trends and patterns in your finances with dynamic charts and summaries.",
            },
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className={`${f.color} p-4 rounded-full mb-4`}>
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{f.title}</h3>
              <p className="text-blue-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-red-600 py-12 text-center text-white mt-auto">
        <h2 className="text-2xl font-bold mb-4">Ready to start analyzing your finances?</h2>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 rounded bg-white text-blue-700 font-bold hover:bg-blue-100 transition"
        >
          Create Free Account
        </button>
        <p className="mt-6 text-sm text-blue-100">
          &copy; {new Date().getFullYear()} Finalyze. All rights reserved.
        </p>
      </footer>
    </div>
  );
};
