'use client'

import {
  Hash,
  Users,
  Plus,
  Edit2,
} from "lucide-react";
import { useState, useMemo } from "react";
import AddNewChannel from "../AddNewChannel";
import { useDispatch, useSelector } from "react-redux";
import { showDMConversationAction, startDmConversationAction } from "@/redux/actions/directMessageAction";
import { fetchWithWait } from "@/helper/method";

const Sidebar = ({ user, allChannel, selectedChannel, selectedWorkSpaceId }) => {
  const [addNewChannel, setAddNewChannal] = useState(false);
  const [search, setSearch] = useState("");

  const { allUser } = useSelector((state) => state.directMsg);
  const { viewMode } = useSelector((state) => state.wrokSpace);

  const dispatch = useDispatch();

  const handleSelectedChannel = (data) => {
    dispatch({ type: 'SET_SELECTED_CHANNEL', payload: data });
  };

  const filteredUsers = useMemo(() => {
    if (!allUser) return [];

    return allUser.filter((u) => {
      const fullName = `${u.first_name || u.name} ${u.last_name || ""}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
  }, [allUser, search]);


    const handleStartDM = (userId) => {
      const payload = {
        user_one_id: user.id,
        user_two_id: userId,
      }

    fetchWithWait({ dispatch, action: startDmConversationAction(payload) }).then((res) => {
      if (res.status === 200) {
        const data = {
          id: res.conversation.id
        }
          dispatch(showDMConversationAction(data))
        }else {
          console.log(res.message);  
        }
        }).catch((e) => {
        console.log(`error`, e)
      })
    }

  return (
    <aside className="w-64 h-screen bg-[#3f0e40] text-white flex flex-col p-3">

      {/* User info */}
      {user && (
        <div className="flex justify-between items-center mb-4 px-2">
          <div>
            <h2 className="text-sm font-bold">
              {`${user.first_name} ${user.last_name}`}
            </h2>
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

      <div className="flex flex-col space-y-2 text-sm">

        {/* CHANNEL MODE */}
        {viewMode === "channel" && allChannel && allChannel.map((channel) => (
          <SidebarItem
            key={channel.id}
            icon={<Hash size={16} />}
            label={channel.name}
            active={selectedChannel?.id === channel.id}
            onClick={() => handleSelectedChannel(channel)}
          />
        ))}

        {/* DM MODE SEARCH */}
        {viewMode === "dm" && (
          <div className="px-2 mb-2">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 text-sm rounded bg-white text-black outline-none"
            />
          </div>
        )}

        {/* <SidebarItem icon={<Users size={16} />} label="People & user groups" /> */}

        {/* DM USERS LIST */}
        {viewMode === "dm" && filteredUsers.map((u) => (
          <SidebarItem
            key={u.id}
            icon={<Users size={16} />}
            label={`${u.first_name || u.name} ${u.last_name || ""}`}
            onClick={() => handleStartDM(u.id)}
          />
        ))}

        {/* EMPTY STATE */}
        {viewMode === "dm" && filteredUsers.length === 0 && (
          <p className="text-xs text-gray-300 px-2">No users found</p>
        )}

      </div>

      <div className="text-xs uppercase font-bold text-white/70 px-2 mt-4 mb-2">
        Channels
      </div>

      {/* ADD CHANNEL */}
      <div className="relative">
        <div
          onClick={() => setAddNewChannal(!addNewChannel)}
          className="flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer"
        >
          <span className="mr-3"><Plus size={16} /></span>
          <span>Add Channel</span>
        </div>

        {addNewChannel && (
          <AddNewChannel
            addNewChannel={addNewChannel}
            setAddNewChannal={setAddNewChannal}
            selectedWorkSpaceId={selectedWorkSpaceId}
          />
        )}
      </div>
    </aside>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, onClick, active }) {
  return (
    <div
      className={`flex items-center px-2 py-1 hover:bg-white/10 rounded cursor-pointer ${
        active ? 'bg-white/20 font-bold' : ''
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default Sidebar;