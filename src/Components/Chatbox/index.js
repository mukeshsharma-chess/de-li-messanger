"use client";

import { fetchWithWait } from "@/helper/method";
import { chattingWithChannelAction, deleteChattingWithChannelAction, getLatestMessageOfParticularChannel,
   membersOfChannelAction, updatedChattingWithChannelAction } from "@/redux/actions/chattingWithChannelAction";
import {
  Paperclip,
  ImagePlus,
  MessageSquare,
  CornerUpRight,
  MoreVertical,
  X,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditMessageModal from "../EditMessageModal";
import ChannelInfoSidebar from "../ChannelInfoSidebar";

export default function ChatBody() {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Modal & upload states
  const [previewFile, setPreviewFile] = useState(null); // real File for upload
  const [previewFileUrl, setPreviewFileUrl] = useState(null); // preview URL
  const [previewType, setPreviewType] = useState(null);
  const [caption, setCaption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // Dropdown & edit
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMsg, setEditMsg] = useState("");
  const [editMsgData, setMsgData] = useState(null);
  const dispatch = useDispatch();

  const { selectedChannel, chattingList, channelMembers } = useSelector((state) => state.wrokSpace);
  const { user } = useSelector((state) => state.login);


  useEffect(() => {
    if (selectedChannel) {
      dispatch(getLatestMessageOfParticularChannel({ channelId: selectedChannel.id }));
      dispatch(membersOfChannelAction({ channelId: selectedChannel.id }));
    }
  }, [selectedChannel]);

  useEffect(() => {
    scrollToBottom();
  }, [chattingList]);

  console.log("chattingListchattingList", chattingList)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /** ---- Send text only ---- **/
  const handleSend = () => {
    if (!input.trim()) return;
    try {
      const formData = new FormData();
      formData.append("channel_id", selectedChannel.id);
      formData.append("user_id", user.id);
      formData.append("message", input);

      fetchWithWait({ dispatch, action: chattingWithChannelAction(formData) }).then((res) => {
        if (res.status === 200) {
          dispatch(getLatestMessageOfParticularChannel({ channelId: selectedChannel.id }));
        } else {
          alert(res.message)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })
      setMessages([...messages, { text: input }]);
      setInput("");
    } catch (err) {
      console.error("Error sending text message:", err);
    }
  };

  /** ---- File upload ---- **/
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFile(file); // store actual File
      setPreviewFileUrl(null); // no preview URL needed for file
      setPreviewType("file");
      setShowModal(true);
    }
  };

  /** ---- Image upload ---- **/
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewFile(file); // store actual File
      setPreviewFileUrl(URL.createObjectURL(file)); // for preview
      setPreviewType("image");
      setShowModal(true);
    }
  };

  /** ---- Confirm send from modal ---- **/
  const handleConfirmSend = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("channel_id", selectedChannel.id);
      formData.append("user_id", user.id);
      formData.append("message", caption || input);

      if (previewType === "image" || previewType === "file") {
        formData.append("attachments[]", previewFile, previewFile.name);
      }

      fetchWithWait({ dispatch, action: chattingWithChannelAction(formData) }).then((res) => {
        if (res.status === 200) {
          dispatch(getLatestMessageOfParticularChannel({ channelId: selectedChannel.id }));
        } else {
          alert(res.message)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })

      setPreviewFile(null);
      setPreviewFileUrl(null);
      setCaption("");
      setShowModal(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  /** ---- Delete message ---- **/
  const handleDeleteMsg = (id) => {
    fetchWithWait({ dispatch, action: deleteChattingWithChannelAction(id) }).then((res) => {
      if (res.status === 200) {
        dispatch(getLatestMessageOfParticularChannel({ channelId: selectedChannel.id }));
      } else {
        alert(res.message)
      }
    }).catch((e) => {
      console.log(`error`, e)
    })
  };

  /** ---- Open Edit Modal ---- **/
  const handleEditMsg = (msg) => {
    console.log("Editing message:", msg);
    setMsgData(msg)
    setEditMsg(msg.message);
    setEditModalOpen(true);
    setOpenDropdown(null);
  };

  /** ---- Save Edit ---- **/
  const handleEditSave = () => {
    if (!newValue.trim()) return;

 try {
      const formData = new FormData();
      formData.append("channel_id", editMsgData.id);
      formData.append("user_id", editMsgData.id);
      formData.append("message", caption || editMsg);

      if (previewType === "image" || previewType === "file") {
        formData.append("attachments[]", previewFile, previewFile.name);
      }

      fetchWithWait({ dispatch, action: updatedChattingWithChannelAction(formData) }).then((res) => {
        if (res.status === 200) {
          dispatch(getLatestMessageOfParticularChannel({ channelId: editMsgData.id }));
        } else {
          alert(res.message)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })

      setCaption("");
      setEditMsg("");
      setShowModal(false);
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setEditModalOpen(false);
    setEditMsg(null);
  };

  // console.log("channelMemberschannelMembers:", channelMembers);

  return (
    <div className="flex flex-col flex-1 h-screen bg-white">
      {/* Chat Header */}
      <div className="p-4 cursor-pointer border-b font-bold text-lg text-gray-800 shadow-sm" onClick={() => setSidebarOpen(true)}>
        # {selectedChannel ? selectedChannel.name : "Select a channel"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {[...(chattingList || [])]?.reverse()?.map((msg, idx) => {
          // Parse attachments safely

          let attachments = msg.attachments ? msg.attachments : [];
          

          const isMine = msg.user_id === user.id;
          const time = new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={msg.id} className="group relative w-fit max-w-lg">
              {/* Message actions */}
              <div className="absolute top-0 right-[-89px] hidden group-hover:flex gap-1 bg-gray-800 text-white p-1 rounded z-10">
                <button className="hover:text-green-400 p-1">
                  <MessageSquare size={16} />
                </button>
                <button className="hover:text-yellow-400 p-1">
                  <CornerUpRight size={16} />
                </button>
                <button
                  className="hover:text-gray-400 p-1"
                  onMouseOver={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                >
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Dropdown */}
              {openDropdown === idx && (
                <div className="absolute top-6 right-[-300px] bg-gray-800 text-white text-sm rounded shadow-lg w-64 z-20">
                  <ul className="divide-y divide-gray-700">
                    <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex justify-between">
                      Save for later <span className="text-gray-400">A</span>
                    </li>
                    <li className="hover:bg-gray-700 px-4 py-2 cursor-pointer">
                      Turn off notifications for replies
                    </li>
                    <li
                      onClick={() => handleDeleteMsg(msg.id)}
                      className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex justify-between text-red-400"
                    >
                      Delete message... <span className="text-red-300">delete</span>
                    </li>
                    <li
                      onClick={() => handleEditMsg(msg)}
                      className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                    >
                      Edit message <span className="text-gray-400">E</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Message content */}
              <div className="text-sm text-gray-800">
                {/* Normal text message */}
                {!attachments?.length && msg.message && (
                  <div className="bg-white p-2 rounded shadow max-w-sm"><span className="p-2 block">{msg.user.first_name}</span>
                    <p className="text-sm mb-2 text-gray-700">{msg.message}</p>
                    <span className="text-xs text-gray-300 block mt-1 text-right">{time}</span>
                  </div>
                )}

                {/* If attachments exist */}
                {attachments.length > 0 &&
                  attachments.map((file, i) => {
                    console.log("fileileileile", file);
                    if (file.file_type === "image" || file.file_type === "jpeg" || file.file_type === "png" || file.file_type === "gif" || file.file_type === "video") {
                      return (
                        <div key={i} className="bg-white p-2 rounded shadow max-w-sm">
                          <span className="p-2 block">{msg.user.first_name}</span>
                          {msg.message && <p className="text-sm mb-2 text-gray-700">{msg.message}</p>}
                          <img
                            src={`/${file.file_path}`}
                            alt={file.original_name}
                            className="rounded max-h-60 object-cover"
                          />
                          <span className="text-xs text-gray-300 block mt-1 text-right">{time}</span>
                        </div>
                      );
                    } else {
                      return (
                        <div key={i} className="bg-white p-2 rounded shadow max-w-sm text-xs text-gray-600">
                          <span className="p-2 block">{msg.user.first_name}</span>
                          {msg.message && <p className="text-sm mb-2 text-gray-700">{msg.message}</p>}
                          📎 <a
                            href={`/${file.file_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {file.original_name}
                          </a>
                          <span className="text-xs text-gray-300 block mt-1 text-right">{time}</span>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          );
        })}
        {/* Invisible div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t px-4 py-2 bg-white">
        <div className="flex items-center gap-2">
          <button onClick={() => imageInputRef.current.click()}>
            <ImagePlus className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
          <button onClick={() => fileInputRef.current.click()}>
            <Paperclip className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-purple-200"
          />

          <button onClick={handleSend} className="p-2 text-purple-600 hover:text-purple-800">
            <Send size={18} />
          </button>

          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
          <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} className="hidden" />
        </div>
      </div>

      {/* Edit Modal */}
      <EditMessageModal
        open={editModalOpen}
        initialValue={editMsg && editMsg}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
      />

      <ChannelInfoSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        channel={selectedChannel}
        members={channelMembers || []}
      />


      {/* Modal Preview */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96 relative">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>

            <div className="mb-3">
              {previewType === "image" ? (
                <img src={previewFileUrl} alt="preview" className="rounded w-full max-h-60 object-cover" />
              ) : (
                <div className="p-3 border rounded bg-gray-100 text-sm text-gray-700">📎 {previewFile.name}</div>
              )}
            </div>

            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption"
              className="w-full border rounded px-3 py-2 text-sm mb-3 outline-none focus:ring focus:ring-purple-200"
            />

            <button
              onClick={handleConfirmSend}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded flex items-center justify-center gap-2"
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
