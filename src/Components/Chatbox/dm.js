"use client";

import { fetchWithWait } from "@/helper/method";
import {
    chattingWithChannelAction, deleteChattingWithChannelAction,
    fetchChattingDataWithChannel, membersOfChannelAction,
    updatedChattingWithChannelAction
} from "@/redux/actions/chattingWithChannelAction";
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
import EditMessageModal from "../EditMessage";
// import ChannelInfoSidebar from "../Channel/ChannelInfoSidebar";
import {
    dmParticularConversationAction, showDMConversationAction, fetchAllDMConversationAction,
    deleteDMConversationAction, updateDMConversationAction
} from "@/redux/actions/directMessageAction";



const imgBaseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

export default function Dmessage() {
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

    const [imagePreview, setImagePreview] = useState(null);


    const dispatch = useDispatch();

    const { allDirectMsg, selectedDMUser, dmMessageList, allUser, allConversation } = useSelector((state) => state.directMsg);
    const { user } = useSelector((state) => state.login);


    // console.log("selectedDMUser:", selectedDMUser);
    // console.log("allDirectMsgallDirectMsg", allDirectMsg);
    // console.log("allUser", allUser);

    // useEffect(() => {
    //   dispatch(fetchAllDMConversationAction());
    // }, []);


    useEffect(() => {
        if (selectedDMUser) {
            dispatch(showDMConversationAction({ "id": selectedDMUser?.id }));
        }
    }, [selectedDMUser]);



    useEffect(() => {
        scrollToBottom();
    }, [allDirectMsg]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    /** ---- Send text only ---- **/
    const handleSend = (e) => {

        e.preventDefault();
        if (!input.trim()) return;
        try {
            const formData = new FormData();
            formData.append("conversation_id", selectedDMUser?.user_two_id);
            formData.append("sender_id", selectedDMUser?.user_one_id);
            formData.append("message", input);
            // formData.append("reply_to_id", 0);
            // formData.append("forwarded_from_id", 0);

            const data = { formData, "id": selectedDMUser?.id }

            // console.log("data to send:", data);

            fetchWithWait({ dispatch, action: dmParticularConversationAction(data) }).then((res) => {
                if (res.status === 200) {
                    dispatch(showDMConversationAction({ "id": selectedDMUser?.id }));
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
            formData.append("conversation_id", selectedDMUser?.user_two_id);
            formData.append("sender_id", selectedDMUser?.user_one_id);
            formData.append("message", caption);
            // formData.append("reply_to_id", 0);
            // formData.append("forwarded_from_id", 0);

            if (previewType === "image" || previewType === "file") {
                formData.append("attachments[]", previewFile, previewFile.name);
            }

            const data = { formData, "id": selectedDMUser?.id }

            fetchWithWait({ dispatch, action: dmParticularConversationAction(data) }).then((res) => {
                if (res.status === 200) {
                    dispatch(showDMConversationAction({ "id": selectedDMUser?.id }));
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
        console.log("Deleting message id:", id);

        fetchWithWait({ dispatch, action: deleteDMConversationAction(id) }).then((res) => {
            if (res.status === 200) {
                dispatch(showDMConversationAction({ "id": selectedDMUser?.id }));
            } else {
                alert(res.message)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    };

    /** ---- Open Edit Modal ---- **/
    const handleEditMsg = (msg) => {
        // console.log("Editing message:", msg);
        setMsgData(msg)
        setEditMsg(msg.message);
        setEditModalOpen(true);
        setOpenDropdown(null);
    };

    console.log("editMsgDataeditMsgData:", editMsgData);

    /** ---- Save Edit ---- **/
    const handleEditSave = (value) => {

        console.log("handleEditSave data:", value);

        if (!value.trim()) return;

        try {
            const formData = new FormData();
            formData.append("conversation_id", selectedDMUser?.user_two_id);
            formData.append("sender_id", selectedDMUser?.user_one_id);
            formData.append("message", value);
            // formData.append("reply_to_id", 0);
            // formData.append("forwarded_from_id", 0);

            if (previewType === "image" || previewType === "file") {
                formData.append("attachments[]", previewFile, previewFile.name);
            }

            const data = { formData, "id": editMsgData.id }

            fetchWithWait({ dispatch, action: updateDMConversationAction(data) }).then((res) => {
                if (res.status === 200) {
                    dispatch(showDMConversationAction({ "id": selectedDMUser?.id }));
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

    // console.log("dmMessageListdmMessageList:", dmMessageList);
    // console.log("selectedDMUserselectedDMUser:", selectedDMUser);
    // console.log("allDirectMsgallDirectMsg:", allDirectMsg);
    // console.log("allConversation", allConversation);



    return (
        <div className="flex flex-col flex-1 h-screen bg-white">
            {/* Chat Header */}
            <div className="p-4 cursor-pointer border-b font-bold text-lg text-gray-800 shadow-sm" onClick={() => setSidebarOpen(true)}>
                # {selectedDMUser ? selectedDMUser['user_two']?.name : "Select a User"}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
                {[...(dmMessageList || [])]?.map((msg, idx) => {

                    let attachments = [];
                    try {
                        if (Array.isArray(msg.attachments)) {
                            attachments = msg.attachments;
                        } else if (typeof msg.attachments === "string") {
                            attachments = JSON.parse(msg.attachments); // in case backend sends stringified JSON
                        }
                    } catch (e) {
                        console.error("Failed to parse attachments", e);
                    }


                    const isMine = msg.user_id === user.id;
                    const time = new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div key={msg.id} className="group relative w-fit max-w-lg">
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

                            <div className="text-sm text-gray-800">
                                {!attachments?.length && msg.message && (
                                    <div className="bg-white p-2 rounded shadow max-w-sm"><span className="p-2 block">{msg['sender'].name}</span>
                                        <p className="text-sm mb-2 text-gray-700">{msg.message}</p>
                                        <span className="text-xs text-gray-300 block mt-1 text-right">{time}</span>
                                    </div>
                                )}

                                {attachments.length > 0 &&
                                    attachments.map((file, i) => {
                                        if (file.file_type === "image" || file.file_type === "image/jpeg" || file.file_type === "jpeg" || file.file_type === "png" || file.file_type === "gif" || file.file_type === "video") {
                                            return (
                                                <div key={i} className="bg-white p-2 rounded shadow max-w-sm">
                                                    <span className="p-2 block">{msg?.sender.name}</span>
                                                    {msg.message && <p className="text-sm mb-2 text-gray-700">{msg.message}</p>}
                                                    <img
                                                        src={`${imgBaseUrl}/${file.file_path}`}
                                                        alt={file.original_name}
                                                        className="rounded max-h-60 object-cover cursor-pointer hover:opacity-90"
                                                        onClick={() => setImagePreview(`${imgBaseUrl}/${file.file_path}`)}
                                                    />

                                                    <span className="text-xs text-gray-300 block mt-1 text-right">{time}</span>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={i} className="bg-white p-2 rounded shadow max-w-sm text-xs text-gray-600">
                                                    <span className="p-2 block">{msg.sender.name}</span>
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
                handleUpdateMessage={handleEditSave}
            />

            {/* <ChannelInfoSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        channel={selectedDMUser}
        members={channelMembers || []}
      /> */}


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

            {/* Image Preview Modal */}
            {/* Image Preview Modal */}
            {imagePreview && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative max-w-3xl max-h-[90vh] flex flex-col">
                        {/* Close button */}
                        <button
                            className="absolute -top-10 right-0 text-white hover:text-gray-300"
                            onClick={() => setImagePreview(null)}
                        >
                            <X size={28} />
                        </button>

                        {/* Image */}
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="rounded-lg max-h-[80vh] object-contain"
                        />

                        {/* Bottom bar with Download button */}
                        <div className="flex justify-center mt-3">
                            <a
                                href={imagePreview}
                                download
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-200 text-gray-700"
                            >
                                <Download size={18} /> Download
                            </a>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

