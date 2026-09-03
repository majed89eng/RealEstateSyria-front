/**
 * High-performance Client-Side Real Estate Image Optimizer
 * Automatically scales, compresses, and converts high-res camera photos
 * to lightweight, modern WebP/JPEG format before uploading/saving.
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'image/webp' | 'image/jpeg' | 'image/png';
}

export interface OptimizedImageResult {
  dataUrl: string;
  fileName: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  savingsPercent: number;
}

const DEFAULT_OPTIONS: Required<ImageOptimizationOptions> = {
  maxWidth: 1920,
  maxHeight: 1280,
  quality: 0.85,
  format: 'image/webp',
};

export class ImageOptimizerService {
  /**
   * Format file size to human-readable string (KB/MB)
   */
  public formatBytes(bytes: number, decimals = 1): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Optimize a single File object using HTML5 Canvas & modern encoding
   */
  public async optimizeImage(
    file: File,
    userOptions?: ImageOptimizationOptions
  ): Promise<OptimizedImageResult> {
    const opts = { ...DEFAULT_OPTIONS, ...userOptions };

    return new Promise((resolve, reject) => {
      // 1. Read file as Image
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة'));

      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('فشل معالجة بيانات الصورة'));

        img.onload = () => {
          let { width, height } = img;

          // 2. Calculate scaling while maintaining aspect ratio
          if (width > opts.maxWidth || height > opts.maxHeight) {
            const widthRatio = opts.maxWidth / width;
            const heightRatio = opts.maxHeight / height;
            const bestRatio = Math.min(widthRatio, heightRatio);

            width = Math.round(width * bestRatio);
            height = Math.round(height * bestRatio);
          }

          // 3. Draw on off-screen Canvas with high-quality smoothing
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('فشل تهيئة محرك معالجة الرسومات'));
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // 4. Export to WebP with fallback
          let dataUrl = '';
          try {
            dataUrl = canvas.toDataURL(opts.format, opts.quality);
            // Check if browser actually produced the requested format
            if (!dataUrl.startsWith(`data:${opts.format}`)) {
              dataUrl = canvas.toDataURL('image/jpeg', opts.quality);
            }
          } catch {
            dataUrl = canvas.toDataURL('image/jpeg', opts.quality);
          }

          // 5. Calculate size and compression stats
          // Base64 size estimation
          const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
          const optimizedSize = Math.round((base64Length * 3) / 4);
          const originalSize = file.size;
          const savings = originalSize > 0 ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100)) : 0;

          resolve({
            dataUrl,
            fileName: file.name,
            originalSize,
            optimizedSize,
            width,
            height,
            savingsPercent: savings,
          });
        };

        if (typeof e.target?.result === 'string') {
          img.src = e.target.result;
        }
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * Batch process multiple images with progress reporting
   */
  public async optimizeMultiple(
    files: File[],
    onProgress?: (processed: number, total: number, latestResult?: OptimizedImageResult) => void,
    userOptions?: ImageOptimizationOptions
  ): Promise<OptimizedImageResult[]> {
    const results: OptimizedImageResult[] = [];
    const total = files.length;

    for (let i = 0; i < total; i++) {
      try {
        const res = await this.optimizeImage(files[i], userOptions);
        results.push(res);
        if (onProgress) {
          onProgress(i + 1, total, res);
        }
      } catch (err) {
        console.warn('Error optimizing image:', files[i]?.name, err);
      }
    }

    return results;
  }
}

export const imageOptimizerService = new ImageOptimizerService();
