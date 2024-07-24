"use client";
import React, { useState } from "react";
import Image from "next/image";
import { addUser, uploadImage, updateUser } from "../../../Firebase/firestore"; // Adjust path as needed
import customize from "../images/preview-section (1).svg";
import profilee from "../images/ph_image (1).svg";
import Header from "../component/header";

const Profile: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (
        selectedImage.size <= 1024 * 1024 &&
        (selectedImage.type === "image/png" || selectedImage.type === "image/jpeg")
      ) {
        setImage(selectedImage);
        setError("");
        const reader = new FileReader();
        reader.onloadend = () => setImageURL(reader.result as string);
        reader.readAsDataURL(selectedImage);
      } else {
        setError("Image must be below 1024x1024px and in PNG or JPG format.");
      }
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName) {
      setError("First name and Last name are required.");
      return;
    }
  
    try {
      setUploading(true);
  
      const userId = await addUser({ firstName, lastName, email });
      console.log("User created with ID:", userId); // Add this line for debugging
  
      if (image) {
        const uploadedImageURL = await uploadImage(image, userId);
        await updateUser(userId, { imageURL: uploadedImageURL });
        setImageURL(uploadedImageURL);
      }
  
      // Clear form and display success message
      setFirstName("");
      setLastName("");
      setEmail("");
      setImage(null);
      setError("");
      console.log("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Error saving profile. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main>
      <Header />
      <section className="pt-0 pr-6 pb-6 pl-6">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white p-[4rem] rounded-md flex justify-center items-center">
            <div className="relative">
              <Image src={customize} alt="Customize preview" width={307} height={300} />
            </div>
          </div>
          <div className="bg-white p-[40px] rounded-md flex flex-col justify-between">
            <h1 className="text-header-M font-[700] text-gray-600">Profile Details</h1>
            <h2 className="text-[14px] font-[400] text-gray-200">
              Add your details to create a personal touch to your profile.
            </h2>
            <div className="flex justify-between w-full items-center p-[2rem] bg-white-- rounded-[12px]">
              <h2 className="text-header-S-M text-gray-200 font-[400]">Profile picture</h2>
              <div className="flex justify-center items-center gap-[1rem]">
                <label
                  htmlFor="file-upload"
                  className={`relative ${imageURL ? "" : "pt-[50px] pr-[30px] pb-[45px] pl-[30px]"} bg-purple-50 flex flex-col items-center cursor-pointer`}
                >
                  {imageURL ? (
                    <div className="relative">
                      <Image src={imageURL} alt="Profile" width={60} height={70} className="object-cover w-full h-full rounded-md" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                        <span className="text-white text-sm">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Image src={profilee} alt="" width={60} height={70} />
                      <h1 className="text-header-S-M font-[600] text-[#633CFF]">+ Upload Image</h1>
                    </div>
                  )}
                  <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} className="hidden" />
                </label>
                <h2 className="text-[13px] text-gray-200 font-[400] w-[40%]">
                  {error || "Image must be below 1024x1024px. Use PNG or JPG format."}
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-[0.7rem] bg-white-- rounded-[12px] p-[1.5rem]">
              <form className="flex flex-col gap-4 mt-[0.7rem]">
                <div className="flex justify-between w-full items-center">
                  <label className="text-header-S-M text-gray-200 w-[240px]">First name*</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                  />
                </div>
                <div className="flex justify-between w-full items-center">
                  <label className="text-header-S-M text-gray-200 w-[240px]">Last name*</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Appleseed"
                    className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                  />
                </div>
                <div className="flex justify-between w-full items-center">
                  <label className="text-header-S-M text-gray-200 w-[240px]">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. email@example.com"
                    className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                  />
                </div>
              </form>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end items-end w-full mt-4">
                <button
                  className="px-[27px] py-[10px] text-header-S-M rounded-[8px] bg-[#633CFF] text-white hover:bg-purple-400"
                  onClick={handleSave}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
