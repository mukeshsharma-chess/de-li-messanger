"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EditMessageModal({ open, initialValue, onClose, onSave }) {
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    if (open) setValue(initialValue || "");
  }, [open, initialValue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96 relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-4">Edit Message</h2>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm mb-3 outline-none focus:ring focus:ring-purple-200"
          autoFocus
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(value)}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
