"use client";
import { fetchWithWait } from "@/helper/method";
import { addNewWorkSpaceAction, fetchWorkSpaceAction } from "@/redux/actions/workSpaceAction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddNewWorkSpace = () => {

  const { user } = useSelector((state) => state.login)

  const [formData, setFormData] = useState({
    companyName: "",
    name: user ? user.name : "",
    profilePhoto: null,
    emails: "",
  });

  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file)); // ✅ generate preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { companyName, name, profilePhoto, emails } = formData;

  //   const arrEmails = emails.split(',').map(email => email.trim());

  //   const formPayload = new FormData();
  //   formPayload.append("companyName", companyName);
  //   formPayload.append("name", name);
  //   formPayload.append("profilePhoto", profilePhoto);

  //   // formPayload.append("emails", JSON.stringify(arrEmails));



  //   console.log("Form Data Submitted:", formPayload);
  // };

  const handleSubmit = (e) => {
  e.preventDefault();
  const { companyName, name, profilePhoto, emails } = formData;

  // Convert emails → array
  const arrEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0);

  const formPayload = new FormData();
  formPayload.append("companyName", companyName);
  formPayload.append("name", name);
  if (profilePhoto) formPayload.append("profilePhoto", profilePhoto);

  // Send emails[]
  arrEmails.forEach((email) => {
    formPayload.append("emails[]", email);
  });

  // ✅ Debug payload
  for (let [key, value] of formPayload.entries()) {
    console.log(key, value);
  }

  // ✅ Call action correctly
  fetchWithWait({ dispatch, action: addNewWorkSpaceAction(formPayload) })
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchWorkSpaceAction());
      } else {
        alert(res.message);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};






console.log("useruser", user)

return (
  <div className="flex justify-center items-center min-h-screen text-white">
    <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg">
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* Step 1: Company */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            What’s the name of your company or team?
          </h2>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. A1 or A1 Marketing"
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
        </div>

        {/* Step 2: Name + Photo */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">What’s your name?</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <div className="mt-4">
            <label className="block mb-2">Upload Profile Photo</label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
            {/* ✅ Show preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Team Members */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Who else is on the team?
          </h2>
          <textarea
            name="emails"
            value={formData.emails}
            onChange={handleChange}
            placeholder="Example ellis@gmail.com, maria@gmail.com"
            className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-600 px-6 py-2 rounded-lg text-white cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-purple-600 px-6 py-2 rounded-lg text-white cursor-pointer"
              >
                Add New Workspace
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
);
};

export default AddNewWorkSpace;
