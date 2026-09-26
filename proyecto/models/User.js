const userSchema = {
  id: String,
  username: String,
  email: String,
  password: String, // hashed
  createdAt: Date
};

export default userSchema;