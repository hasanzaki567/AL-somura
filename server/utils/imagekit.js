import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

dotenv.config();

/**
 * Uploads a file (base64 data URL, buffer, or file URL) to ImageKit using ImageKit Upload REST API.
 * Uses FormData for reliable binary/base64 upload.
 * Falls back to local filesystem storage if ImageKit credentials are missing or request fails.
 * 
 * @param {string} fileData - Base64 data string (e.g. data:image/png;base64,...) or image URL
 * @param {string} fileName - Destination file name
 * @param {string} folder - Target folder in ImageKit (default: '/products')
 * @returns {Promise<{ url: string, fileId?: string, isLocal?: boolean }>}
 */
export async function uploadImageToImageKit(fileData, fileName, folder = '/products') {
  const privateKey = (process.env.IMAGEKIT_PRIVATE_KEY || '').trim();
  const urlEndpoint = (process.env.IMAGEKIT_URL_ENDPOINT || '').trim();
  const publicKey = (process.env.IMAGEKIT_PUBLIC_KEY || '').trim();

  if (privateKey && urlEndpoint && publicKey) {
    try {
      const authHeader = 'Basic ' + Buffer.from(privateKey + ':').toString('base64');
      const cleanFileName = (fileName || `img_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '_');

      const formData = new FormData();
      formData.append('file', fileData);
      formData.append('fileName', cleanFileName);
      if (folder) {
        formData.append('folder', folder);
      }
      formData.append('useUniqueFileName', 'true');

      console.log(`[ImageKit] Uploading file (${cleanFileName}) to folder ${folder}...`);

      const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
        },
        body: formData
      });

      const responseData = await response.json();

      if (response.ok && responseData.url) {
        console.log(`[ImageKit] Upload success! CDN URL: ${responseData.url}`);
        return {
          url: responseData.url,
          fileId: responseData.fileId,
          filePath: responseData.filePath,
          isLocal: false
        };
      } else {
        console.error('[ImageKit] Upload API Error Response:', response.status, responseData);
      }
    } catch (err) {
      console.error('[ImageKit] Exception during ImageKit upload:', err);
    }
  } else {
    console.warn('[ImageKit] Credentials missing in environment variables. Falling back to local storage.');
  }

  // Fallback to local disk storage
  console.log('[ImageKit] Falling back to local disk storage for image upload...');
  return saveToLocalStorage(fileData, fileName);
}

/**
 * Fallback helper to save image to local uploads directory
 */
function saveToLocalStorage(image, fileName) {
  try {
    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      if (image.startsWith('http://') || image.startsWith('https://')) {
        return { url: image, isLocal: true };
      }
      throw new Error('Invalid image base64 format');
    }

    let extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    if (extension.includes('png')) extension = 'png';
    if (extension.includes('webp')) extension = 'webp';
    if (extension.includes('svg')) extension = 'svg';

    const cleanFileName = (fileName || `prod_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '_');
    const name = `${cleanFileName}_${Date.now()}.${extension}`;
    
    const uploadsDir = path.resolve(process.cwd(), 'server/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, name);
    fs.writeFileSync(filepath, Buffer.from(matches[2], 'base64'));

    return {
      url: `http://localhost:5000/uploads/${name}`,
      isLocal: true
    };
  } catch (err) {
    console.error('Error saving image to local storage:', err);
    throw err;
  }
}

/**
 * Returns authentication parameters for direct client-side ImageKit uploads if needed
 */
export function getAuthenticationParameters() {
  const privateKey = (process.env.IMAGEKIT_PRIVATE_KEY || '').trim();
  const publicKey = (process.env.IMAGEKIT_PUBLIC_KEY || '').trim();
  const urlEndpoint = (process.env.IMAGEKIT_URL_ENDPOINT || '').trim();

  if (!privateKey || !publicKey || !urlEndpoint) {
    throw new Error('ImageKit credentials are not configured.');
  }

  const token = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const expire = Math.floor(Date.now() / 1000) + 2400; // 40 minutes expiration
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex');

  return {
    token,
    expire,
    signature,
    publicKey,
    urlEndpoint
  };
}
