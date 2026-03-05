// Components/Sidebar/index.js

'use client'

import {
  Hash,
  Users,
  Plus,
  Edit2,
} from "lucide-react";
import { useState } from "react";
import AddNewChannel from "../AddNewChannel";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ user, allChannel, selectedChannel, selectedWorkSpaceId }) => {
  const [addNewChannel, setAddNewChannal] = useState(false);

  const { allUser } = useSelector((state) => state.directMsg);

  const dispatch = useDispatch();

  const handleSelectedChannel = (data) => {
    dispatch({ type: 'SET_SELECTED_CHANNEL', payload: data });
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

      <div className="flex justify-between items-center mb-4 px-2" />
      {/* Default Sidebar Items */}
      <div className="flex flex-col space-y-2 text-sm">

        {/* Channels List */}
        {allChannel && allChannel.length > 0 && allChannel.map((channel) => (
          <SidebarItem
            key={channel.id}
            icon={<Hash size={16} />}
            label={channel.name}
            active = {selectedChannel?.id === channel.id}
            onClick={() => handleSelectedChannel(channel)} // ✅ handle channel click
          />
        ))}

        <SidebarItem icon={<Users size={16} />} label="People & user groups" />

        {allUser &&
          allUser.map((user) =>
            user.id === localUser ? null : (
              <SidebarItem
                key={user.id}
                icon={<AtSign size={16} />}
                label={user.name}
                // onClick={() => onChannelSelect(channel)}
              />
            )
          )}

      </div>

      <div className="flex justify-between items-center mb-4 px-2" /> 

      <div className="text-xs uppercase font-bold text-white/70 px-2 mb-2">
        Channels
      </div>

      <div className="flex justify-between items-center mb-4 px-2" />

      {/* Add Channel */}
      <div className="relative">
        <div
          onClick={() => setAddNewChannal(!addNewChannel)}
          className="flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer"
        >
          <span className="mr-3"><Plus size={16} /></span>
          <span>Add Channel</span>
        </div>

        {addNewChannel && <AddNewChannel addNewChannel={addNewChannel} setAddNewChannal={setAddNewChannal} selectedWorkSpaceId = {selectedWorkSpaceId} /> }

      </div>
    </aside>
  );
}

/* Sidebar Item Component */
function SidebarItem({ icon, label, onClick, active }) {
  return (
    <div
      className={`flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer ${active ? 'bg-white/20 font-bold' : ''}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default Sidebar;