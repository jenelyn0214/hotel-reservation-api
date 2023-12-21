export const generateSlug = (name: string, length = 5, id?: string) => {
  const idString: string = id ? id.substring(0, length) : '00000';

  const nameString: string = name.toLowerCase().replaceAll(' ', '-');
  return nameString + '-' + idString;
};
