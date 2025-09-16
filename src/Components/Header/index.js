// src/components/Header.jsx

import { Bell, HelpCircle, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#350d36] text-white shadow-md">
      {/* Left: Logo and Workspace Name */}
      <div className="flex items-center space-x-3">
        <img
          src="/images/slack-logo.png"
          alt="Slack Logo"
          className="h-8 w-8 object-contain"
        />
        <span className="text-lg font-semibold">My Workspace</span>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 mx-4 max-w-md">
        <div className="flex items-center bg-[#421f44] text-gray-300 px-3 py-1 rounded-md">
          <Search className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <HelpCircle className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <img
          src="/images/avatar.png"
          alt="User Avatar"
          className="h-8 w-8 rounded-full border border-white cursor-pointer"
        />
      </div>
    </header>
  );
}
