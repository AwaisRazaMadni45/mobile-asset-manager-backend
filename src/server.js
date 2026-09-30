const dotenv = require('dotenv');
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET missing hai');
  process.exit(1);
}

const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});