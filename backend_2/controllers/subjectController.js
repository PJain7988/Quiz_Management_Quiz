// controllers/subjectController.js
import Subject from '../models/Subject.js';

// Create a new subject
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Subject name is required' });

    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (error) {
    console.error('Create Subject Error:', error);
    res.status(500).json({ message: 'Failed to create subject', error: error.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    console.error('Get Subjects Error:', error);
    res.status(500).json({ message: 'Failed to fetch subjects' });
  }
};

// Update subject by ID
export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    res.json(subject);
  } catch (error) {
    console.error('Update Subject Error:', error);
    res.status(500).json({ message: 'Failed to update subject' });
  }
};

// Delete subject by ID
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete Subject Error:', error);
    res.status(500).json({ message: 'Failed to delete subject' });
  }
};
