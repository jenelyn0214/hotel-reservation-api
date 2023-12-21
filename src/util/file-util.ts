export const getPhotoId = (photoLink: string) => {
  if (!photoLink.includes('image/upload/')) return photoLink;

  const photoNameSplit = photoLink.split('image/upload/');

  return photoNameSplit[1] ?? '';
};
