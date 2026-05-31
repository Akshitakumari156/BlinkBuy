import React, { useEffect, useState } from 'react';
import { Typography, IconButton, InputAdornment, TextField, Button } from '@mui/material';
import { FaCamera, FaUserEdit, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/userData';

const Setting = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [password, setPassword] = useState({ currentPassword: "", changePassword: "" });

  useEffect(() => {
    if (userData) {
      setFormData({ firstName: userData.firstName, lastName: userData.lastName });
    }
  }, [userData]);

  const fileHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowFile(URL.createObjectURL(selectedFile));
    }
  };

  const updateProfilePictureHandler = async () => {
    if (!file) return;
    const toastId = toast.loading("Uploading image...");
    const data = new FormData();
    data.append("image", file);
    data.append("userId", userData?._id);

    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updateProfilePicture`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(setUserData(response?.data?.updateUser));
      setFile(null);
      setShowFile(null);
      toast.success("Profile picture updated!", { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const nameUpdateHandler = async () => {
    if (userData?.firstName === formData.firstName && userData?.lastName === formData.lastName) {
      return toast.error("No changes detected");
    }
    const toastId = toast.loading("Updating name...");
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/nameUpdate`, 
        { ...formData, userId: userData?._id }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setUserData(response?.data?.updateUser));
      toast.success("Name updated!", { id: toastId });
    } catch (error) {
      toast.error("Update failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const passwordUpdateHandler = async () => {
    if (password.changePassword.length < 8) return toast.error("Password too short");
    const toastId = toast.loading("Updating password...");
    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/passwordUpdate`, 
        { ...password, userId: userData?._id }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassword({ currentPassword: "", changePassword: "" });
      toast.success("Password secured!", { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <header className="mb-10">
          <Typography variant="h4" className="text-white font-bold">Account Settings</Typography>
          <p className="text-gray-500">Manage your profile information and security preferences.</p>
        </header>

        {/* 1. Profile Picture Card */}
        <section className="bg-[#12121A] border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-xl">
          <div className="relative group">
            <img 
              src={showFile || userData?.profilePicture} 
              className="h-32 w-32 rounded-full object-cover border-4 border-indigo-500/20 group-hover:border-indigo-500 transition-all" 
              alt="Profile" 
            />
            <label className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 shadow-lg">
              <FaCamera className="text-white text-sm" />
              <input type="file" className="hidden" onChange={fileHandler} accept="image/*" />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-white text-xl font-semibold">Profile Photo</h3>
            <p className="text-gray-500 text-sm">Update your photo to help buyers recognize you.</p>
            {file && (
              <div className="flex gap-2 justify-center md:justify-start">
                <Button variant="contained" color="primary" onClick={updateProfilePictureHandler} disabled={loading} size="small">
                  Save Changes
                </Button>
                <Button variant="outlined" color="error" onClick={() => {setFile(null); setShowFile(null)}} size="small">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* 2. Personal Info Card */}
        <section className="bg-[#12121A] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FaUserEdit className="text-indigo-500" />
            <h3 className="text-white text-xl font-semibold">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              variant="filled"
              sx={inputStyles}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              variant="filled"
              sx={inputStyles}
              fullWidth
            />
          </div>
          <Button 
            fullWidth 
            onClick={nameUpdateHandler} 
            disabled={loading}
            sx={actionBtnStyles}
          >
            Update Profile
          </Button>
        </section>

        {/* 3. Security Card */}
        <section className="bg-[#12121A] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FaLock className="text-red-500" />
            <h3 className="text-white text-xl font-semibold">Security</h3>
          </div>

          <div className="space-y-6 mb-6">
            <TextField
              label="Current Password"
              name="currentPassword"
              type={showPass ? "text" : "password"}
              value={password.currentPassword}
              onChange={(e) => setPassword({...password, currentPassword: e.target.value})}
              variant="filled"
              sx={inputStyles}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)} edge="end" sx={{color: 'gray'}}>
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="New Password"
              name="changePassword"
              type={showPass ? "text" : "password"}
              value={password.changePassword}
              onChange={(e) => setPassword({...password, changePassword: e.target.value})}
              variant="filled"
              sx={inputStyles}
              fullWidth
            />
          </div>
          <Button 
            fullWidth 
            onClick={passwordUpdateHandler} 
            disabled={loading}
            sx={{...actionBtnStyles, backgroundColor: '#FACC15', '&:hover': {backgroundColor: '#EAB308'}}}
          >
            Change Password
          </Button>
        </section>

      </div>
    </div>
  );
};

const inputStyles = {
  "& .MuiFilledInput-root": {
    backgroundColor: "#0B0B0F",
    color: "white",
    borderRadius: "8px",
    "&:before, &:after": { display: "none" }
  },
  "& .MuiInputLabel-root": { color: "#6B7280" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#6366F1" }
};

const actionBtnStyles = {
  backgroundColor: "#6366F1",
  color: "white",
  fontWeight: "bold",
  py: 1.5,
  borderRadius: "12px",
  textTransform: "none",
  "&:hover": { backgroundColor: "#4F46E5" }
};

export default Setting;