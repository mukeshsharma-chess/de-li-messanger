// src/components/Sidebar.jsx

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

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#3f0e40] text-white flex flex-col p-3">
      {/* Profile Section */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div>
          <h2 className="text-sm font-bold">abhisek patel</h2>
          <span className="flex items-center text-xs text-green-400">
            <span className="mr-1">●</span>
            abhisek patel
          </span>
        </div>
        <button>
          <Edit2 className="w-4 h-4 text-white opacity-80" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-2 text-sm">
        <SidebarItem icon={<MessageSquare size={16} />} label="Thread" />
        <SidebarItem icon={<AtSign size={16} />} label="Mentions & reactions" />
        <SidebarItem icon={<Bookmark size={16} />} label="Saved items" />
        <SidebarItem icon={<Hash size={16} />} label="Channel browser" />
        <SidebarItem icon={<Users size={16} />} label="People & user groups" />
        <SidebarItem icon={<Grid size={16} />} label="Apps" />
        <SidebarItem icon={<FileText size={16} />} label="File browser" />
        <SidebarItem icon={<ChevronUp size={16} />} label="Show less" />
      </div>

      <hr className="my-3 border-white/20" />

      {/* Channels */}
      <div className="text-xs uppercase font-bold text-white/70 px-2 mb-2">
        Channels
      </div>
      <SidebarItem icon={<Plus size={16} />} label="Add Channel" />
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer">
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
