"use client";
import { X, UserPlus } from "lucide-react";

export default function ChannelInfoSidebar({ open, onClose, channel, members }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative w-96 h-full bg-white shadow-lg p-4 overflow-y-auto z-50 animate-slideIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {channel?.name || "Channel Info"}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={20} />
          </button>
        </div>

        {/* Channel Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {channel?.description || "No description provided"}
          </p>
        </div>

        {/* Members */}
        <div>
          <h3 className="text-md font-semibold mb-2">Members</h3>
          <ul className="space-y-3">
            {members?.map((m) => (
              <li
                key={m.id}
                className="flex items-center gap-3 border-b pb-2"
              >
                <img
                  src={m.profile || "/default-avatar.png"}
                  alt={m.first_name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-medium">{m.first_name}</p>
                  <p className="text-xs text-gray-500">{m.status || "Active"}</p>
                </div>
                {m.is_admin && (
                  <span className="ml-auto text-xs bg-green-200 text-green-700 px-2 py-1 rounded">
                    Admin
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Add Member */}
        <div className="mt-6">
          <button className="flex items-center gap-2 w-full px-3 py-2 border rounded-lg hover:bg-gray-100">
            <UserPlus size={18} /> Add Member
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
