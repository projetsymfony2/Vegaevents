import { Request, Response } from 'express';
import { uploadCVToDatabase, getAllCVsFromDatabase, deleteCVFromDatabase, saveCandidature } from '../models/cvModel';

// Constants
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// Helper function to validate phone number
const isValidPhoneNumber = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

// Helper function to validate file extension
const isValidFileExtension = (filename: string): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? ALLOWED_EXTENSIONS.includes(extension) : false;
};

export const uploadCV = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log incoming request data
    console.log('Incoming request body:', req.body);
    console.log('Incoming files:', req.files);

    // Basic validation
    if (!req.files || !('cv' in req.files)) {
      res.status(400).json({ message: 'CV file is required.' });
      return;
    }

    if (!req.body.fullName?.trim()) {
      res.status(400).json({ message: 'Full name is required.' });
      return;
    }

    if (!req.body.phoneNumber?.trim()) {
      res.status(400).json({ message: 'Phone number is required.' });
      return;
    }

    // Phone number validation
    if (!isValidPhoneNumber(req.body.phoneNumber)) {
      res.status(400).json({ message: 'Invalid phone number format.' });
      return;
    }

    // File processing
    const file = Array.isArray(req.files.cv) ? req.files.cv[0] : req.files.cv;

    // File validation
    if (!file || typeof file !== 'object' || !file.name || !file.data) {
      res.status(400).json({ message: 'Invalid file format. Please upload a single valid file.' });
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      res.status(400).json({ message: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.` });
      return;
    }

    // File extension validation
    if (!isValidFileExtension(file.name)) {
      res.status(400).json({ 
        message: `Invalid file format. Allowed formats are: ${ALLOWED_EXTENSIONS.join(', ')}` 
      });
      return;
    }

    // Upload file to Supabase storage
    const { fileName, uploadError } = await uploadCVToDatabase(file);

    if (uploadError) {
      console.error('File upload error:', uploadError);
      res.status(500).json({ 
        message: 'Error uploading file to storage.',
        error: uploadError
      });
      return;
    }

    // Generate file URL
    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/cv-bucket/${fileName}`;

    // Save candidature to database
    const { data: candidature, saveError } = await saveCandidature(
      req.body.fullName.trim(),
      req.body.phoneNumber.trim(),
      fileUrl
    );

    if (saveError) {
      console.error('Candidature save error:', saveError);
      res.status(500).json({ 
        message: 'Error saving candidature details.',
        error: saveError
      });
      return;
    }

    // Success response
    res.status(200).json({
      message: 'CV uploaded and candidature saved successfully',
      fileName,
      candidature
    });

  } catch (error) {
    console.error('Unexpected error in uploadCV:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllCVs = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllCVsFromDatabase();

    if (result.error) {
      console.error('Error fetching CVs:', result.error);
      res.status(500).json({ 
        message: 'Error retrieving CVs',
        error: result.error
      });
      return;
    }

    res.status(200).json({
      message: 'CVs retrieved successfully',
      files: result.files || []
    });

  } catch (error) {
    console.error('Unexpected error in getAllCVs:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteCV = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileName } = req.params;

    if (!fileName?.trim()) {
      res.status(400).json({ message: 'File name is required.' });
      return;
    }

    const { error } = await deleteCVFromDatabase(fileName);

    if (error) {
      console.error('Error deleting CV:', error);
      res.status(500).json({ 
        message: 'Error deleting CV',
        error: error
      });
      return;
    }

    res.status(200).json({
      message: 'CV deleted successfully',
      fileName: fileName
    });

  } catch (error) {
    console.error('Unexpected error in deleteCV:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};