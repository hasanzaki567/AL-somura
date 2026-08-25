import dotenv from 'dotenv';
import { uploadImageToImageKit, getAuthenticationParameters } from './utils/imagekit.js';

dotenv.config();

async function test() {
  console.log('Testing ImageKit Configuration...');
  console.log('URL Endpoint:', process.env.IMAGEKIT_URL_ENDPOINT);
  console.log('Public Key:', process.env.IMAGEKIT_PUBLIC_KEY ? 'Configured (✓)' : 'Missing (✗)');
  console.log('Private Key:', process.env.IMAGEKIT_PRIVATE_KEY ? 'Configured (✓)' : 'Missing (✗)');

  try {
    const authParams = getAuthenticationParameters();
    console.log('\nGenerated Auth Parameters for Client Upload:');
    console.log('Token:', authParams.token);
    console.log('Expire:', authParams.expire);
    console.log('Signature:', authParams.signature ? authParams.signature.slice(0, 10) + '...' : 'None');

    // Test a tiny 1x1 base64 transparent PNG image upload to ImageKit
    const testBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSU5ErkJggg==';
    console.log('\nAttempting test upload to ImageKit CDN...');
    const result = await uploadImageToImageKit(testBase64, 'test_pixel', '/products');
    console.log('\nUpload Result:');
    console.log('CDN Image URL:', result.url);
    console.log('Is Local Fallback?:', result.isLocal ? 'Yes' : 'No (ImageKit Live CDN)');
  } catch (err) {
    console.error('Test error:', err);
  }
}

test();
