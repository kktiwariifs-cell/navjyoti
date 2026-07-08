/**
 * Utility function to compress images using canvas resizing.
 * This converts large base64 images into a smaller, optimized base64 jpeg,
 * preventing QuotaExceededError in localStorage and payload limits in database sync.
 */
export const compressImage = (base64Str: string, maxWidth = 1920, maxHeight = 1080, quality = 0.9): Promise<string> => {
  return new Promise((resolve) => {
    // If it's not a standard image data URL, return original
    if (!base64Str || !base64Str.startsWith('data:image/')) {
      resolve(base64Str);
      return;
    }

    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Check if resizing is necessary
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(base64Str);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      
      // Use image/jpeg with given quality to drastically reduce file size
      try {
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (e) {
        console.error('Failed to compress image:', e);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
};

/**
 * Common helper function to read a file, compress it, and return via callback.
 */
export const handleImageUpload = (file: File, callback: (base64: string) => void) => {
  const reader = new FileReader();
  reader.onload = async () => {
    if (typeof reader.result === 'string') {
      const compressed = await compressImage(reader.result);
      callback(compressed);
    }
  };
  reader.readAsDataURL(file);
};
