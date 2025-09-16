"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const visibilityOptions = [
  {
    name: "Public - Anyone in Work-Space1",
    value: "public",
    description: "",
  },
  {
    name: "Private - Only specific people",
    value: "private",
    description: "Can only be viewed or joined by invitation",
  },
];

const AddNewChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [visibility, setVisibility] = useState("public");

  return (
    <div className="bg-gray-900 text-white w-[400px] p-6 rounded-lg shadow-xl space-y-5">
      <button className="text-sm text-gray-400 mb-2 hover:underline">&larr; Back</button>

      <h2 className="text-xl font-semibold">Channel details</h2>

      <div>
        <label htmlFor="channelName" className="block text-sm mb-1">
          Channel name
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400">#</span>
          <input
            type="text"
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            maxLength={80}
            placeholder="e.g. subscription-budget"
            className="bg-gray-800 border border-gray-700 pl-7 pr-10 py-2 w-full rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <span className="absolute right-3 top-2.5 text-sm text-gray-500">
            {80 - channelName.length}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
        </p>
      </div>

      <div>
        <p className="text-sm mb-2 font-medium">Visibility</p>
        <RadioGroup value={visibility} onChange={setVisibility}>
          <div className="space-y-2">
            {visibilityOptions.map((option) => (
              <RadioGroup.Option key={option.value} value={option.value} className={({ checked }) =>
                `flex items-start space-x-2 p-2 rounded cursor-pointer transition-colors ${
                  checked ? "bg-gray-800 border border-cyan-400" : "bg-gray-800 border border-transparent"
                }`
              }>
                {({ checked }) => (
                  <>
                    <div className="pt-1">
                      <span className={`h-4 w-4 inline-block rounded-full border-2 ${checked ? "border-cyan-400 bg-cyan-400" : "border-gray-500"}`}></span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{option.name}</p>
                      {option.description && (
                        <p className="text-xs text-gray-400">{option.description}</p>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <button
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition duration-150"
        disabled={!channelName}
      >
        Create
      </button>
    </div>
  );
}

export default AddNewChannel;