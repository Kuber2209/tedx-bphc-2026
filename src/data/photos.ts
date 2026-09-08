export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Total active photos currently present in /public/gallery/
 * 20 photos are currently extracted and active (image1.jpg to image20.jpg).
 * When you add more pictures later (up to 50-60), simply update this number!
 */
export const TOTAL_PHOTOS = 20;

export const photos: GalleryPhoto[] = Array.from({ length: TOTAL_PHOTOS }, (_, i) => {
  const index = i + 1;
  return {
    id: `photo-${index}`,
    src: `/gallery/image${index}.jpg`,
    alt: `TEDx BPHC Moment ${index}`,
  };
});
