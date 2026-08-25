/**
 * ImageKit Utility functions for client-side image transformation and delivery
 */

export const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/2hex1t00o0';
export const IMAGEKIT_PUBLIC_KEY = 'public_36+2m9kwSuKufbsNqG85mfIN5jQ=';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max';
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  blur?: number;
}

/**
 * Transforms an ImageKit image URL with dynamic optimization parameters (width, height, quality, auto format).
 * E.g., convert https://ik.imagekit.io/2hex1t00o0/products/shoe.jpg
 * to https://ik.imagekit.io/2hex1t00o0/tr:w-600,q-80,f-auto/products/shoe.jpg
 */
export function getOptimizedImageUrl(url: string, options: ImageTransformOptions = {}): string {
  if (!url) return '';

  // Return non-ImageKit URLs as is
  if (!url.includes('ik.imagekit.io')) {
    return url;
  }

  const transforms: string[] = [];

  if (options.width) transforms.push(`w-${options.width}`);
  if (options.height) transforms.push(`h-${options.height}`);
  if (options.quality) transforms.push(`q-${options.quality}`);
  if (options.crop) transforms.push(`c-${options.crop}`);
  if (options.blur) transforms.push(`bl-${options.blur}`);

  // Default to auto format for best WebP/AVIF compression
  const format = options.format || 'auto';
  transforms.push(`f-${format}`);

  if (transforms.length === 0) return url;

  const transformString = `tr:${transforms.join(',')}`;

  // Insert transformation string after endpoint URL
  if (url.includes('/tr:')) {
    // Already has transformation, replace it
    return url.replace(/\/tr:[^/]+/, `/${transformString}`);
  }

  const endpoint = IMAGEKIT_URL_ENDPOINT.replace(/\/$/, '');
  if (url.startsWith(endpoint)) {
    return url.replace(endpoint, `${endpoint}/${transformString}`);
  }

  return url;
}
