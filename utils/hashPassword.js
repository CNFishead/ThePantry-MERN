import bcyrpt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcyrpt.genSalt(10);
  const encryptedPassword = await bcyrpt.hash(password, salt);
  return encryptedPassword;
};
