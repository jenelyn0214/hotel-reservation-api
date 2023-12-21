import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export const encryptPassword = (password: string) => {
  const salt = genSaltSync(10);

  const passwordHashed = hashSync(password, salt);

  return passwordHashed;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const isCorrect = compareSync(password, hashedPassword);

  return isCorrect;
};
