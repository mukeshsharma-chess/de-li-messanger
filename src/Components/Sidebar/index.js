'use client'

import {
  MessageSquare,
  AtSign,
  Bookmark,
  Hash,
  Users,
  Grid,
  FileText,
  ChevronUp,
  Plus,
  Edit2,
} from "lucide-react";
import { useState } from "react";
import AddNewChannel from "../AddNewChannel";

export default function Sidebar({ user, allChannel, onChannelSelect }) {
  const [addNewChannel, setAddNewChannal] = useState(false);
  const [channelName, setChannalName] = useState(false);

  const handleChannelName = () => {
    setAddNewChannal(!addNewChannel);
    setChannalName(!channelName);
  };

  return (
    <aside className="w-64 h-screen bg-[#3f0e40] text-white flex flex-col p-3">
      {/* User info */}
      {user && (
        <div className="flex justify-between items-center mb-4 px-2">
          <div>
            <h2 className="text-sm font-bold">{`${user.first_name} ${user.last_name}`}</h2>
            <span className="flex items-center text-xs text-green-400">
              <span className="mr-1">●</span>
              {`${user.first_name} ${user.last_name}`}
            </span>
          </div>
          <button>
            <Edit2 className="w-4 h-4 text-white opacity-80" />
          </button>
        </div>
      )}

      {/* Default Sidebar Items */}
      <div className="flex flex-col space-y-2 text-sm">

        {/* Channels List */}
        {allChannel && allChannel.length > 0 && allChannel.map((channel) => (
          <SidebarItem
            key={channel.id}
            icon={<Hash size={16} />}
            label={channel.name}
            onClick={() => onChannelSelect(channel)} // ✅ handle channel click
          />
        ))}

        <SidebarItem icon={<Users size={16} />} label="People & user groups" />

      </div>

      <hr className="my-3 border-white/20" />

      <div className="text-xs uppercase font-bold text-white/70 px-2 mb-2">
        Channels
      </div>

      <hr className="my-3 border-white/20" />

      {/* Add Channel */}
      <div className="relative">
        <div
          onClick={() => setAddNewChannal(!addNewChannel)}
          className="flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer"
        >
          <span className="mr-3"><Plus size={16} /></span>
          <span>Add Channel</span>
        </div>

        {/* Dropdown for Add Channel */}
        {/* {addNewChannel ? (
          <div className="absolute mt-2 w-60 rounded-md bg-gray-800 text-white shadow-lg p-2 z-50">
            <div onClick={handleChannelName} className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
              Create a new channel
            </div>
            <div className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
              Browse channels
            </div>
          </div>
        ) : null} */}

        {addNewChannel ? <AddNewChannel handleChannelName={handleChannelName} /> : null}

      </div>
    </aside>
  );
}

/* Sidebar Item Component */
function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      className="flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer"
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
