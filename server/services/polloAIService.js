import axios from 'axios';

// Pollo AI API Configuration
// Check your Pollo AI dashboard for the correct API endpoint
// Common endpoints: https://api.hyperbolic.xyz/v1 or check Pollo documentation
const POLLO_API_URL = process.env.POLLO_API_URL || 'https://api.hyperbolic.xyz/v1';
const POLLO_API_KEY = process.env.POLLO_API_KEY;

console.log('Pollo AI Service initialized with URL:', POLLO_API_URL);

/**
 * Generate video from text prompt using Pollo AI
 * @param {string} prompt - The text prompt for video generation
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Task details including task_id
 */
export const generateVideoFromPrompt = async (prompt, options = {}) => {
  try {
    if (!POLLO_API_KEY) {
      throw new Error('POLLO_API_KEY is not configured');
    }

    const payload = {
      prompt: prompt,
      model: options.model || 'pollo-1.5',
      duration: options.duration || 5, // Duration in seconds (3-10)
      aspect_ratio: options.aspectRatio || '16:9', // 16:9, 9:16, 1:1
      quality: options.quality || 'standard', // standard, high
      negative_prompt: options.negativePrompt || '',
    };

    console.log('Generating video with Pollo AI:', { prompt, model: payload.model, url: POLLO_API_URL });

    const response = await axios.post(
      `${POLLO_API_URL}/video/generation`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${POLLO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    console.log('Pollo AI video generation started:', response.data);

    return {
      success: true,
      taskId: response.data.task_id || response.data.id,
      status: response.data.status || 'processing',
      data: response.data,
    };
  } catch (error) {
    console.error('Pollo AI generateVideoFromPrompt error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || 
      error.response?.data?.message ||
      'Failed to generate video with Pollo AI'
    );
  }
};

/**
 * Check video generation status
 * @param {string} taskId - The task ID from generateVideoFromPrompt
 * @returns {Promise<Object>} - Task status and video URL if completed
 */
export const checkVideoStatus = async (taskId) => {
  try {
    if (!POLLO_API_KEY) {
      throw new Error('POLLO_API_KEY is not configured');
    }

    const response = await axios.get(
      `${POLLO_API_URL}/video/generation/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${POLLO_API_KEY}`,
        },
        timeout: 15000,
      }
    );

    const status = response.data.status;
    const result = {
      success: true,
      status: status,
      taskId: taskId,
    };

    // If completed, include video URL
    if (status === 'completed' || status === 'succeeded') {
      result.videoUrl = response.data.video_url || response.data.output?.video_url;
      result.thumbnailUrl = response.data.thumbnail_url || response.data.output?.thumbnail_url;
      result.duration = response.data.duration;
    }

    // If failed, include error message
    if (status === 'failed') {
      result.error = response.data.error || 'Video generation failed';
    }

    return result;
  } catch (error) {
    console.error('Pollo AI checkVideoStatus error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || 
      error.response?.data?.message ||
      'Failed to check video status'
    );
  }
};

/**
 * Poll for video completion
 * @param {string} taskId - The task ID to poll
 * @param {number} maxAttempts - Maximum polling attempts (default: 60)
 * @param {number} interval - Polling interval in ms (default: 5000)
 * @returns {Promise<Object>} - Final video result
 */
export const pollVideoCompletion = async (taskId, maxAttempts = 60, interval = 5000) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts++;
    
    try {
      const result = await checkVideoStatus(taskId);
      
      console.log(`Polling attempt ${attempts}/${maxAttempts} - Status: ${result.status}`);

      if (result.status === 'completed' || result.status === 'succeeded') {
        return result;
      }

      if (result.status === 'failed') {
        throw new Error(result.error || 'Video generation failed');
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {
      if (attempts >= maxAttempts) {
        throw error;
      }
      console.error(`Polling error on attempt ${attempts}, retrying...`, error.message);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }

  throw new Error('Video generation timeout - max polling attempts reached');
};

/**
 * Generate and wait for video completion (convenience method)
 * @param {string} prompt - The text prompt
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} - Completed video result
 */
export const generateAndWaitForVideo = async (prompt, options = {}) => {
  try {
    // Start generation
    const startResult = await generateVideoFromPrompt(prompt, options);
    
    if (!startResult.taskId) {
      throw new Error('No task ID returned from video generation');
    }

    console.log('Video generation started, polling for completion...');
    
    // Poll for completion
    const result = await pollVideoCompletion(startResult.taskId);
    
    return result;
  } catch (error) {
    console.error('generateAndWaitForVideo error:', error.message);
    throw error;
  }
};

export default {
  generateVideoFromPrompt,
  checkVideoStatus,
  pollVideoCompletion,
  generateAndWaitForVideo,
};
