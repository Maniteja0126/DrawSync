"use client";

import {
  Pencil,
  Share2,
  Users,
  Square,
  Circle,
  Triangle,
  TextCursor as Cursor,
  Type,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-500/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-32 h-32 bg-green-500/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="absolute top-20 right-1/4 animate-spin-slow">
          <Square className="w-12 h-12 text-blue-500/30" />
        </div>
        <div
          className="absolute bottom-1/4 left-20 animate-spin-slow"
          style={{ animationDelay: "2s" }}
        >
          <Triangle className="w-12 h-12 text-purple-500/30" />
        </div>
        <div
          className="absolute top-1/3 left-1/4 animate-spin-slow"
          style={{ animationDelay: "4s" }}
        >
          <Circle className="w-8 h-8 text-green-500/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        <div className="text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 typewriter">
              Welcome to the future of whiteboarding
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mt-4">
              Draw Together,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Create Together
              </span>
            </h1>
          </div>
          <p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            A beautiful whiteboard tool that lets you easily create and share
            diagrams, wireframes, and visual ideas.
          </p>
          <div
            className="flex justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all">
              <Link href={"/signin"}>Start Drawing</Link>
            </button>
          </div>
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <div
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 animate-float">
              <Pencil className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Intuitive Drawing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simple yet powerful tools for creating beautiful diagrams and
              sketches.
            </p>
          </div>

          <div
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 animate-float">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-time Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Work together with your team in real-time, anywhere in the world.
            </p>
          </div>

          <div
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 animate-float">
              <Share2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Easy Sharing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your creations with a simple link or export them in various
              formats.
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-4 relative">
              <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                  <Cursor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Square className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Circle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Triangle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Type className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
              </div>

              <div className="aspect-video bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 800 400">
                  <path
                    d="M100,200 C150,100 200,100 250,200 S350,300 400,200"
                    fill="none"
                    stroke="currentColor"
                    className="text-blue-500 dark:text-blue-400 stroke-2 animate-draw"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <circle
                    cx="500"
                    cy="200"
                    r="50"
                    className="text-purple-500 dark:text-purple-400 animate-draw"
                    fill="none"
                    stroke="currentColor"
                    style={{ animationDelay: "1.5s" }}
                  />
                  <rect
                    x="600"
                    y="150"
                    width="100"
                    height="100"
                    className="text-green-500 dark:text-green-400 animate-draw"
                    fill="none"
                    stroke="currentColor"
                    style={{ animationDelay: "2.5s" }}
                  />
                </svg>

                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm animate-pulse-slow">
                    JD
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                  >
                    AS
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                  >
                    RK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
