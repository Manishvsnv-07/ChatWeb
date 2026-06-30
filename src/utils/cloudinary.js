export const getOptimizedImage = (url, options = {}) => {
  if (!url || !url.includes('/upload/')) return url; // safety check

  const { width = 200, height = 200, crop = 'fill', quality = 'auto:best' } = options;

  return url.replace(
    '/upload/',
    `/upload/w_${width},h_${height},c_${crop},q_${quality},f_auto/`
  );
};