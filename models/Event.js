const eventSchema = {
  id: String,
  title: String,
  description: String,
  date: Date,
  location: String,
  createdBy: String, // user id
  createdAt: Date
};

export default eventSchema;