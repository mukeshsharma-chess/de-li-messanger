'use client'

import AddNewWorkSpace from "@/Components/AddNewWorkSpace";
import ChatBody from "@/Components/Chatbox";
import DMChatBody from "@/Components/Chatbox/dm";
import { useSelector } from "react-redux";

const Home = () => {

  const { openAddWorkSpace, viewMode } = useSelector((state) => state.wrokSpace);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!openAddWorkSpace ? (
          viewMode === "dm" ? <DMChatBody /> : <ChatBody />
        ) : (
          <AddNewWorkSpace />
        )}
    </div>
  );
}

export default Home;