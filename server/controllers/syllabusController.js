import Syllabus from '../models/Syllabus.js';
import { 
  generateVideoFromPrompt, 
  getVideoTaskStatus, 
  generatePromptFromSyllabus 
} from '../services/klingAIService.js';

/**
 * Create a new syllabus
 */
export const createSyllabus = async (req, res) => {
  try {
    const { title, subject, grade, description, content, topics, adminId } = req.body;

    if (!title || !subject || !grade || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, subject, grade, and content are required'
      });
    }

    const syllabus = new Syllabus({
      title,
      subject,
      grade,
      description,
      content,
      topics: topics || [],
      createdBy: adminId
    });

    // Auto-generate prompt from syllabus
    syllabus.generatedPrompt = generatePromptFromSyllabus(syllabus);

    await syllabus.save();

    res.status(201).json({
      success: true,
      message: 'Syllabus created successfully',
      data: syllabus
    });
  } catch (error) {
    console.error('Create syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating syllabus',
      error: error.message
    });
  }
};

/**
 * Get all syllabi
 */
export const getAllSyllabi = async (req, res) => {
  try {
    const { page = 1, limit = 10, subject, grade } = req.query;
    
    const query = {};
    if (subject) query.subject = subject;
    if (grade) query.grade = grade;

    const syllabi = await Syllabus.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Syllabus.countDocuments(query);

    res.status(200).json({
      success: true,
      data: syllabi,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get syllabi error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching syllabi',
      error: error.message
    });
  }
};

/**
 * Get a single syllabus by ID
 */
export const getSyllabusById = async (req, res) => {
  try {
    const { id } = req.params;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    res.status(200).json({
      success: true,
      data: syllabus
    });
  } catch (error) {
    console.error('Get syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching syllabus',
      error: error.message
    });
  }
};

/**
 * Update a syllabus
 */
export const updateSyllabus = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subject, grade, description, content, topics } = req.body;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    if (title) syllabus.title = title;
    if (subject) syllabus.subject = subject;
    if (grade) syllabus.grade = grade;
    if (description) syllabus.description = description;
    if (content) syllabus.content = content;
    if (topics) syllabus.topics = topics;

    // Regenerate prompt if content changed
    syllabus.generatedPrompt = generatePromptFromSyllabus(syllabus);

    await syllabus.save();

    res.status(200).json({
      success: true,
      message: 'Syllabus updated successfully',
      data: syllabus
    });
  } catch (error) {
    console.error('Update syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating syllabus',
      error: error.message
    });
  }
};

/**
 * Delete a syllabus
 */
export const deleteSyllabus = async (req, res) => {
  try {
    const { id } = req.params;

    const syllabus = await Syllabus.findByIdAndDelete(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Syllabus deleted successfully'
    });
  } catch (error) {
    console.error('Delete syllabus error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting syllabus',
      error: error.message
    });
  }
};

/**
 * Generate prompt from syllabus
 */
export const generatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { customPrompt } = req.body;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    // Use custom prompt if provided, otherwise generate from syllabus
    const prompt = customPrompt || generatePromptFromSyllabus(syllabus);
    
    syllabus.generatedPrompt = prompt;
    await syllabus.save();

    res.status(200).json({
      success: true,
      message: 'Prompt generated successfully',
      data: {
        prompt,
        syllabusId: syllabus._id
      }
    });
  } catch (error) {
    console.error('Generate prompt error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error generating prompt',
      error: error.message
    });
  }
};

/**
 * Generate video from syllabus using Kling AI
 */
export const generateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { customPrompt, options } = req.body;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    // Use custom prompt or the stored/generated prompt
    const prompt = customPrompt || syllabus.generatedPrompt || generatePromptFromSyllabus(syllabus);

    // Update syllabus with the prompt
    syllabus.generatedPrompt = prompt;
    syllabus.videoGenerationStatus = 'generating';

    // Call Kling AI to generate video
    const result = await generateVideoFromPrompt(prompt, {
      duration: options?.duration || '5',
      aspectRatio: options?.aspectRatio || '16:9',
      mode: options?.mode || 'std',
      ...options
    });

    if (result.success) {
      syllabus.videoTaskId = result.taskId;
      await syllabus.save();

      res.status(200).json({
        success: true,
        message: 'Video generation started',
        data: {
          syllabusId: syllabus._id,
          taskId: result.taskId,
          prompt,
          status: 'generating'
        }
      });
    } else {
      syllabus.videoGenerationStatus = 'failed';
      await syllabus.save();
      
      throw new Error(result.message || 'Failed to start video generation');
    }
  } catch (error) {
    console.error('Generate video error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error generating video',
      error: error.message
    });
  }
};

/**
 * Check video generation status
 */
export const checkVideoStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus not found'
      });
    }

    if (!syllabus.videoTaskId) {
      return res.status(400).json({
        success: false,
        message: 'No video generation task found for this syllabus'
      });
    }

    // Check status from Kling AI
    const status = await getVideoTaskStatus(syllabus.videoTaskId);

    // Update syllabus based on status
    if (status.status === 'succeed') {
      syllabus.videoGenerationStatus = 'completed';
      syllabus.videoUrl = status.videoUrl;
      syllabus.thumbnailUrl = status.thumbnailUrl;
    } else if (status.status === 'failed') {
      syllabus.videoGenerationStatus = 'failed';
    } else {
      syllabus.videoGenerationStatus = 'generating';
    }

    await syllabus.save();

    res.status(200).json({
      success: true,
      data: {
        syllabusId: syllabus._id,
        taskId: syllabus.videoTaskId,
        status: status.status,
        progress: status.progress,
        videoUrl: status.videoUrl,
        thumbnailUrl: status.thumbnailUrl
      }
    });
  } catch (error) {
    console.error('Check video status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking video status',
      error: error.message
    });
  }
};

/**
 * Generate video directly from prompt (without syllabus)
 */
export const generateVideoFromText = async (req, res) => {
  try {
    const { prompt, title, options } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    // Call Kling AI to generate video
    const result = await generateVideoFromPrompt(prompt, {
      duration: options?.duration || '5',
      aspectRatio: options?.aspectRatio || '16:9',
      mode: options?.mode || 'std',
      ...options
    });

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Video generation started',
        data: {
          taskId: result.taskId,
          title: title || 'Custom Video',
          prompt,
          status: 'generating'
        }
      });
    } else {
      throw new Error(result.message || 'Failed to start video generation');
    }
  } catch (error) {
    console.error('Generate video from text error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error generating video',
      error: error.message
    });
  }
};

/**
 * Check video task status by task ID
 */
export const checkTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }

    const status = await getVideoTaskStatus(taskId);

    res.status(200).json({
      success: true,
      data: {
        taskId,
        status: status.status,
        progress: status.progress,
        videoUrl: status.videoUrl,
        thumbnailUrl: status.thumbnailUrl,
        duration: status.duration
      }
    });
  } catch (error) {
    console.error('Check task status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking task status',
      error: error.message
    });
  }
};
