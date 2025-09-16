"use client";

import { fetchWithWait } from "@/helper/method";
import { chattingWithChannelAction, deleteChattingWithChannelAction, fetchChattingDataWithChannel } from "@/redux/actions/chattingWithChannelAction";
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

export default function ChatBody() {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Modal & upload states
  const [previewFile, setPreviewFile] = useState(null); // real File for upload
  const [previewFileUrl, setPreviewFileUrl] = useState(null); // preview URL
  const [previewType, setPreviewType] = useState(null);
  const [caption, setCaption] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Dropdown & edit
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();

  const { selectedChannel, chattingList } = useSelector((state) => state.wrokSpace);
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (selectedChannel) {
      dispatch(fetchChattingDataWithChannel({ channelId: selectedChannel.id }));
    }
  }, [selectedChannel]);

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
            dispatch(fetchChattingDataWithChannel({ channelId: selectedChannel.id }));
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
            dispatch(fetchChattingDataWithChannel({ channelId: selectedChannel.id }));
        } else {
            alert(res.message)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })

      setMessages([
        ...messages,
        {
          text: caption || input,
          file: previewType === "file" ? previewFile : null,
          images: previewType === "image" ? [previewFileUrl] : null,
        },
      ]);

      // reset modal
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
            dispatch(fetchChattingDataWithChannel({ channelId: selectedChannel.id }));
        } else {
            alert(res.message)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })
    

    setMessages(messages.filter((_, i) => i !== idx));
    setOpenDropdown(null);
  };

  /** ---- Edit message ---- **/
  const handleEditMsg = (idx) => {
    setEditIdx(idx);
    setEditValue(messages[idx]?.text || "");
    setOpenDropdown(null);
  };

  const handleEditSave = () => {
    if (editValue.trim()) {
      setMessages((prev) =>
        prev.map((msg, i) => (i === editIdx ? { ...msg, text: editValue } : msg))
      );
      setEditIdx(null);
      setEditValue("");
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditValue("");
  };

  // console.log("selectedChannelselectedChannel", selectedChannel);

  return (
    <div className="flex flex-col flex-1 h-screen bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b font-bold text-lg text-gray-800 shadow-sm">
        # {selectedChannel ? selectedChannel.name : "Select a channel"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {chattingList?.map((msg, idx) => {
          // Parse attachments safely
          // console.log("MessageMessage:", );
          let attachments = [];
          try {
            attachments = msg.attachments ? JSON.parse(msg.attachments) : [];
          } catch (e) {
            attachments = [];
          }

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
                      onClick={() => handleEditMsg(idx)}
                      className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                    >
                      Edit message <span className="text-gray-400">E</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Message content */}
              <div className="text-sm text-gray-800">
                {editIdx === idx && msg.message !== undefined ? (
                  <div className="flex gap-2 items-center">
                    <input
                      className="border rounded px-2 py-1 text-sm flex-1"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <button onClick={handleEditSave} className="text-green-600 font-bold px-2">
                      Save
                    </button>
                    <button onClick={handleEditCancel} className="text-gray-500 px-2">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Normal text message */}
                    {!msg.attachments && msg.message && (
                      <div className="bg-white p-2 rounded shadow max-w-sm"><span className="p-2 block">{msg.user.first_name}</span>
                      <p className="text-sm mb-2 text-gray-700">{msg.message}</p></div>
                    )}

                    {/* If attachments exist */}
                    {attachments.length > 0 &&
                      attachments.map((file, i) => {
                        if (file.file_type.startsWith("image/")) {
                          return (
                            <div key={i} className="bg-white p-2 rounded shadow max-w-sm">
                              <span className="p-2 block">{msg.user.first_name}</span>
                              {msg.message && <p className="text-sm mb-2 text-gray-700">{msg.message}</p>}
                              <img
                                src={`/${file.file_path}`}
                                alt={file.original_name}
                                className="rounded max-h-60 object-cover"
                              />
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
                            </div>
                          );
                        }
                      })}
                  </>
                )}
              </div>
            </div>
          );
        })}
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
