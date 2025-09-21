'use client';

import { Plus } from "lucide-react";
import { openWorkSpaceAction, selectedWorkspaceAction, showWorkSpaceAction } from "@/redux/actions/workSpaceAction";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

const WorkspaceModal = ({ allWorkSpace, selectedWorkSpace, showWorkSpaceModel }) => {

  console.log("showWorkSpaceModel", showWorkSpaceModel)

  const dispatch = useDispatch();
  const modalRef = useRef(null); // reference for modal

  const hanldeAddWorkSpace = () => {
    dispatch(showWorkSpaceAction(false));
    dispatch(openWorkSpaceAction(true));
  };

  const handleSelectWorkspace = (id) => {
    dispatch(selectedWorkspaceAction(id));
    dispatch(showWorkSpaceAction(!showWorkSpaceModel))
  };

  // Close modal if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(showWorkSpaceAction(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWorkSpaceModel]);

  return (
    <div
      ref={modalRef}
      className="w-96 bg-gradient-to-b from-[#3c3c3c] to-[#1f1f1f] rounded-xl overflow-hidden text-white shadow-lg"
    >
      {selectedWorkSpace && (
        <div className="p-4">
          <h3 className="font-semibold text-sm">{selectedWorkSpace.name}</h3>
          <p className="text-xs text-gray-400">{selectedWorkSpace.slug}</p>
        </div>
      )}

      <div className="border-t border-[#2f2f2f]"></div>

      <div className="flex flex-col">
        {allWorkSpace?.map((item) => {
          if (item.id === selectedWorkSpace.id) return null; // Skip the first item
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#2f2f2f] cursor-pointer"
              onClick={() => handleSelectWorkspace(item.id)}
            >
              <div className="bg-gray-500 text-black font-semibold text-sm w-8 h-8 rounded-md flex items-center justify-center border-2 border-transparent hover:border-white transition-colors duration-200">
                {item.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm">{item.name}</p>
                <p className="text-xs text-gray-400">{item.slug}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#2f2f2f]"></div>

      <button
        onClick={hanldeAddWorkSpace}
        className="w-full flex items-center gap-3 p-4 hover:bg-[#2f2f2f] cursor-pointer"
      >
        <div className="bg-[#3c3c3c] p-2 rounded-md">
          <Plus size={16} />
        </div>
        <span className="text-sm font-medium">Add a workspace</span>
      </button>
    </div>
  );
};

export default WorkspaceModal;
