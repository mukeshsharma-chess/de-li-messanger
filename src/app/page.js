'use client'

import AddNewWorkSpace from "@/Components/AddNewWorkSpace";
import ChatBody from "@/Components/Chatbox";
import Image from "next/image";
import { useSelector } from "react-redux";

const Home = () => {

  const { openAddWorkSpace } = useSelector((state) => state.wrokSpace);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!openAddWorkSpace ? <ChatBody /> : <AddNewWorkSpace /> }
    </div>
  );
}

export default Home;