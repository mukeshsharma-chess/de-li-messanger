'use client';

import { Gift } from 'lucide-react';

export default function WelcomeMessage() {
  return (
    <div className="w-full h-screen bg-[#1e1f22] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700 bg-[#2b2d31]">
        <div className="bg-green-500 p-2 rounded-md">
          <Gift className="text-black" size={24} />
        </div>
        <span className="text-lg font-semibold">Welcome message</span>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-2 bg-[#2b2d31] border-b border-gray-700">
        <button className="text-white font-medium border-b-2 border-white pb-1">Messages</button>
        <button className="ml-4 text-gray-400 hover:text-white">About</button>
      </div>

      {/* Message Section */}
      <div className="flex flex-col items-start px-6 py-10 flex-grow">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-4 rounded-lg">
            <Gift className="text-black" size={32} />
          </div>
          <div>
            <p className="text-xl font-semibold">Welcome message</p>
            <span className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded">WORKFLOW</span>
            <span className="ml-2 text-green-400 text-sm">●</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-300">
          This is the very beginning of your direct message history with <span className="text-blue-400 cursor-pointer">@Welcome message</span>
        </p>

        {/* Hint Link */}
        <a href="#" className="mt-4 text-blue-400 text-sm hover:underline">
          💡 How does Welcome message work?
        </a>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="bg-[#313338] p-2 rounded-md flex items-center gap-2">
          <input
            type="text"
            placeholder="Message Welcome message"
            className="bg-transparent text-white placeholder-gray-400 flex-grow outline-none"
          />
          {/* Example: Icons */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="cursor-pointer">Aa</span>
            <span className="cursor-pointer">😊</span>
            <span className="cursor-pointer">📎</span>
            <span className="cursor-pointer">🎤</span>
            <span className="cursor-pointer">📅</span>
          </div>
        </div>
      </div>
    </div>
  );
}
