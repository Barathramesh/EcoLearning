
import axios from 'axios';
import crypto from 'crypto';

/**
 * Video Generation Service
 * Supports multiple providers: Kling AI, Replicate, and Demo Mode
 * 
 * To use:
 * - Kling AI: Set KLING_ACCESS_KEY and KLING_SECRET_KEY in .env
 * - Replicate: Set REPLICATE_API_TOKEN in .env (get from https://replicate.com/account/api-tokens)
 * - Demo Mode: Set VIDEO_DEMO_MODE=true in .env for testing
 */

const KLING_API_BASE = 'https://api.klingai.com';

// Demo video URLs for testing (reliable public MP4 videos)
const DEMO_VIDEOS = [
  {
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=640&h=360&fit=crop'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=640&h=360&fit=crop'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=640&h=360&fit=crop'
  }
];

// Store for video tasks
const videoTasks = new Map();

// Check if demo mode is enabled
const isDemoMode = () => {
  return process.env.VIDEO_DEMO_MODE === 'true';
};

// Check which provider to use
const getVideoProvider = () => {
  if (isDemoMode()) return 'demo';
  if (process.env.REPLICATE_API_TOKEN) return 'replicate';
  if (process.env.KLING_ACCESS_KEY && process.env.KLING_SECRET_KEY) return 'kling';
  return 'demo';
};

// Generate JWT token for Kling AI authentication
const generateKlingToken = () => {
  const accessKey = process.env.KLING_ACCESS_KEY;
  const secretKey = process.env.KLING_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error('Kling AI credentials not configured. Please set KLING_ACCESS_KEY and KLING_SECRET_KEY in .env');
  }

  // Create JWT header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Create JWT payload
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: accessKey,
    exp: now + 1800, // Token valid for 30 minutes
    nbf: now - 5
  };

  // Encode header and payload
  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  // Create signature
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(`${base64Header}.${base64Payload}`)
    .digest('base64url');

  return `${base64Header}.${base64Payload}.${signature}`;
};

// Create axios instance for Kling AI
const createKlingClient = () => {
  const token = generateKlingToken();
  
  return axios.create({
    baseURL: KLING_API_BASE,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    timeout: 60000
  });
};

/**
 * Generate animated video from text prompt using Kling AI
 * @param {string} prompt - The video generation prompt
 * @param {object} options - Additional options for video generation
 * @returns {object} Task information including task_id
 */
export const generateVideoFromPrompt = async (prompt, options = {}) => {
  // Check if demo mode is enabled
  if (isDemoMode()) {
    console.log('🎬 Demo Mode: Simulating video generation...');
    const taskId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const randomVideo = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)];
    
    // Store demo task with delayed completion
    videoTasks.set(taskId, {
      status: 'processing',
      prompt,
      createdAt: Date.now(),
      videoData: randomVideo
    });

    // Simulate completion after 10 seconds
    setTimeout(() => {
      const task = videoTasks.get(taskId);
      if (task) {
        task.status = 'succeed';
        videoTasks.set(taskId, task);
      }
    }, 10000);

    return {
      success: true,
      taskId,
      message: 'Demo video generation started (will complete in ~10 seconds)',
      isDemo: true
    };
  }

  try {
    const client = createKlingClient();

    const requestBody = {
      model_name: options.model || 'kling-v1', // kling-v1 or kling-v1-5
      prompt: prompt,
      negative_prompt: options.negativePrompt || 'blur, distortion, low quality, watermark',
      cfg_scale: options.cfgScale || 0.5, // 0-1, how closely to follow the prompt
      mode: options.mode || 'std', // 'std' for standard, 'pro' for professional quality
      aspect_ratio: options.aspectRatio || '16:9', // 16:9, 9:16, 1:1
      duration: options.duration || '5' // 5 or 10 seconds
    };

    console.log('Sending request to Kling AI:', JSON.stringify(requestBody, null, 2));

    const response = await client.post('/v1/videos/text2video', requestBody);

    console.log('Kling AI response:', JSON.stringify(response.data, null, 2));

    if (response.data.code === 0) {
      return {
        success: true,
        taskId: response.data.data.task_id,
        message: 'Video generation started successfully'
      };
    } else {
      // If insufficient balance, fall back to demo mode
      if (response.data.code === 1102) {
        console.log('⚠️ Insufficient Kling AI balance - falling back to demo mode');
        return generateVideoFromPromptDemo(prompt, options);
      }
      throw new Error(response.data.message || 'Failed to start video generation');
    }
  } catch (error) {
    console.error('Kling AI generateVideoFromPrompt error:', error.response?.data || error.message);
    
    // If API error due to balance, fall back to demo mode
    if (error.response?.data?.code === 1102 || error.message?.includes('balance')) {
      console.log('⚠️ Insufficient Kling AI balance - falling back to demo mode');
      return generateVideoFromPromptDemo(prompt, options);
    }
    
    throw new Error(error.response?.data?.message || error.message || 'Failed to generate video');
  }
};

/**
 * Demo mode video generation (fallback when no credits)
 */
const generateVideoFromPromptDemo = async (prompt, options = {}) => {
  console.log('🎬 Demo Mode: Simulating video generation...');
  const taskId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const randomVideo = DEMO_VIDEOS[Math.floor(Math.random() * DEMO_VIDEOS.length)];
  
  // Store demo task with delayed completion
  videoTasks.set(taskId, {
    status: 'processing',
    prompt,
    createdAt: Date.now(),
    videoData: randomVideo
  });

  // Simulate completion after 10 seconds
  setTimeout(() => {
    const task = videoTasks.get(taskId);
    if (task) {
      task.status = 'succeed';
      videoTasks.set(taskId, task);
    }
  }, 10000);

  return {
    success: true,
    taskId,
    message: '⚠️ Demo Mode: Kling AI has insufficient balance. Using sample video for demonstration.',
    isDemo: true
  };
};

/**
 * Check the status of a video generation task
 * @param {string} taskId - The task ID from generateVideoFromPrompt
 * @returns {object} Task status and video URL if completed
 */
export const getVideoTaskStatus = async (taskId) => {
  // Check if this is a demo task
  if (taskId.startsWith('demo_')) {
    const demoTask = videoTasks.get(taskId);
    if (!demoTask) {
      return {
        success: true,
        status: 'failed',
        progress: 'Demo task not found'
      };
    }

    if (demoTask.status === 'succeed') {
      return {
        success: true,
        status: 'succeed',
        progress: 'Demo video ready',
        videoUrl: demoTask.videoData.videoUrl,
        thumbnailUrl: demoTask.videoData.thumbnailUrl,
        duration: 5,
        isDemo: true
      };
    }

    return {
      success: true,
      status: 'processing',
      progress: 'Demo video generating...',
      isDemo: true
    };
  }

  try {
    const client = createKlingClient();

    const response = await client.get(`/v1/videos/text2video/${taskId}`);

    console.log('Kling AI status response:', JSON.stringify(response.data, null, 2));

    if (response.data.code === 0) {
      const taskData = response.data.data;
      
      return {
        success: true,
        status: taskData.task_status, // 'submitted', 'processing', 'succeed', 'failed'
        progress: taskData.task_status_msg || '',
        videoUrl: taskData.task_result?.videos?.[0]?.url || null,
        thumbnailUrl: taskData.task_result?.videos?.[0]?.cover_url || null,
        duration: taskData.task_result?.videos?.[0]?.duration || null
      };
    } else {
      throw new Error(response.data.message || 'Failed to get task status');
    }
  } catch (error) {
    console.error('Kling AI getVideoTaskStatus error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get video status');
  }
};

/**
 * Generate an educational video prompt from syllabus content
 * @param {object} syllabus - The syllabus object
 * @returns {string} Generated prompt for video creation
 */
export const generatePromptFromSyllabus = (syllabus) => {
  const { title, subject, grade, content, topics } = syllabus;

  // Build topic descriptions
  let topicsDescription = '';
  if (topics && topics.length > 0) {
    topicsDescription = topics
      .map(t => t.topicName)
      .slice(0, 3) // Limit to first 3 topics for prompt clarity
      .join(', ');
  }

  // Create an educational video prompt
  const prompt = `Create an engaging animated educational video about ${title} for ${grade} students studying ${subject}. ${content ? `The video should cover: ${content.substring(0, 200)}` : ''} ${topicsDescription ? `Key topics include: ${topicsDescription}.` : ''} Use colorful, child-friendly animations with clear visuals, smooth transitions, and an engaging storytelling approach. Include visual representations of concepts, diagrams, and animated characters explaining the content. The style should be modern, educational, and captivating for students.`;

  return prompt.trim();
};

/**
 * Generate image-to-video using Kling AI
 * @param {string} imageUrl - URL of the image to animate
 * @param {string} prompt - Motion/animation prompt
 * @param {object} options - Additional options
 * @returns {object} Task information
 */
export const generateImageToVideo = async (imageUrl, prompt, options = {}) => {
  try {
    const client = createKlingClient();

    const requestBody = {
      model_name: options.model || 'kling-v1',
      image: imageUrl,
      prompt: prompt || 'animate this image with smooth motion',
      negative_prompt: options.negativePrompt || 'blur, distortion, low quality',
      cfg_scale: options.cfgScale || 0.5,
      mode: options.mode || 'std',
      duration: options.duration || '5'
    };

    const response = await client.post('/v1/videos/image2video', requestBody);

    if (response.data.code === 0) {
      return {
        success: true,
        taskId: response.data.data.task_id,
        message: 'Image-to-video generation started successfully'
      };
    } else {
      throw new Error(response.data.message || 'Failed to start image-to-video generation');
    }
  } catch (error) {
    console.error('Kling AI generateImageToVideo error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Failed to generate video from image');
  }
};

export default {
  generateVideoFromPrompt,
  getVideoTaskStatus,
  generatePromptFromSyllabus,
  generateImageToVideo
};
