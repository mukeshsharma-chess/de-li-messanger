'use client'

import {
  Home,
  MessageSquare,
  Bell,
  MoreHorizontal,
  Plus,
  Pencil,
} from 'lucide-react';
import WorkspaceModal from '../WorkspaceModal';
import { useDispatch, useSelector } from 'react-redux';
import { showWorkSpaceAction } from '@/redux/actions/workSpaceAction';


const baseImgUrl = process.env.NEXT_PUBLIC_IMG_BASE_URL


const WorkspaceSidebar = ({  allWorkSpace, selectedWorkSpace }) => {

  
  const { showWorkSpaceModel } = useSelector((state) => state.wrokSpace);

  const dispatch = useDispatch();

  const handleOpenAddNewWorkModel = () =>{
    dispatch(showWorkSpaceAction(true))
  }

  return (
    <div className="relative w-16 bg-[#2c003e] h-screen flex flex-col justify-between items-center py-4 text-white">
      
      {/* Top Avatar */}
      <div className="flex flex-col items-center gap-6">
        <div onClick={() => handleOpenAddNewWorkModel(!showWorkSpaceModel)} className="cursor-pointer bg-gray-500 text-black rounded-md w-10 h-10 flex items-center justify-center text-sm font-bold">
          {selectedWorkSpace && selectedWorkSpace.logo ? 
            <img className='rounded-md' src={`${baseImgUrl}/${selectedWorkSpace.logo}`} alt={selectedWorkSpace.slug} /> : selectedWorkSpace ?
           selectedWorkSpace?.name.charAt(0).toUpperCase() : '+'}
        </div>
        {
          showWorkSpaceModel && (
            <div className="absolute left-[60px] top-[50px] z-50">
              {<WorkspaceModal allWorkSpace = {allWorkSpace} selectedWorkSpace = {selectedWorkSpace} showWorkSpaceModel = {showWorkSpaceModel} />}   
            </div>
          ) 
        }

        {/* Icons */}
        <div className="flex flex-col items-center gap-6 text-xs">
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#704172] p-2 rounded-md">
              <Home size={20} />
            </div>
            <span>Home</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MessageSquare size={20} />
            <span>DMs</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bell size={20} />
            <span>Activity</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MoreHorizontal size={20} />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <Plus size={20} />
        </button>

        <div className="relative">
          <img
            src="/images/sample-user.png"
            alt="User"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
            <Pencil size={10} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;