import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    let { fullname, email, phoneNumber, password, role } = req.body;

    // ตรวจสอบว่ามีการกรอกข้อมูลครบหรือไม่
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }


    fullname = fullname.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    password = password.trim();

    if (fullname.length === 0 || email.length === 0 || phoneNumber.length === 0 || password.length === 0) {
      return res.status(400).json({ success: false, message: 'Fields cannot be empty or have spaces' });
    }

    // ตรวจสอบว่า email ถูกต้องหรือไม่
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // ตรวจสอบว่า password ถูกต้องหรือไม่ (ควรมีความยาวขั้นต่ำ 6 ตัวอักษร)
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // ตรวจสอบว่าไฟล์มีหรือไม่
    const file = req.file;
    let profilePhotoUrl = '';
    
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url; // ได้ URL ของไฟล์ที่อัพโหลดแล้ว
    }

    // เช็คว่าอีเมลมีอยู่ในระบบแล้วหรือไม่
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password.',
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect email or password.',
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current role.",
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: 'strict',
      })
      .json({
        success: true,
        message: `Welcome ${user.fullname}`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const userId = req.id; // from auth middleware

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    // Convert skills string to array
    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",").map(skill => skill.trim()).filter(Boolean);
    }

    // Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handle file upload if file is present
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw", // <<<< สำคัญมาก
        public_id: `resumes/${userId}_resume`,
        folder: "resumes",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });
      
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    // Return only necessary fields
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      message: "Something went wrong while updating profile.",
      success: false
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to log out.',
    });
  }
};
