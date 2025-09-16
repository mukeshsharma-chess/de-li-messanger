"use client";
import { useState } from "react";

const AddNewWorkSpace = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    profilePhoto: null,
    emails: "",
  });

  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit}>
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
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-purple-600 px-6 py-2 rounded-lg"
              >
                Finish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewWorkSpace;
