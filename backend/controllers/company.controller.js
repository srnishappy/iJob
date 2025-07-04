import { Company } from '../models/company.model.js';
import getDataUri from './../utils/datauri.js';
import cloudinary from './../utils/cloudinary.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required.',
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "You can't register same company.",
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Company registered successfully.',
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register company.',
    });
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }
    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get company.',
    });
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }
    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
      const { name, description, website, location } = req.body;

      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;
  
      const updateData = { name, description, website, location, logo };

      const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

      if (!company) {
          return res.status(404).json({
              message: "Company not found.",
              success: false
          })
      }
      return res.status(200).json({
          message:"Company information updated.",
          success:true
      })

  } catch (error) {
      console.log(error);
  }
}
