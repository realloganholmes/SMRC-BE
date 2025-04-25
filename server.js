const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const authProtectedRoutes = require('./routes/authProtectedRoutes');
const coolerRoutes = require('./routes/coolerRoutes');
const coolerAdminRoutes = require('./routes/coolerAdminRoutes');
const recapRoutes = require('./routes/recapRoutes');
const recapAdminRoutes = require('./routes/recapAdminRoutes');
const rfgRoutes = require('./routes/rfgRoutes');
const rfgAdminRoutes = require('./routes/rfgAdminRoutes');
const uploadRouter = require('./routes/uploadFileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const User = require('./models/User');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.admin) {
      return res.status(401).json({ message: 'User is not an administrator' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const protectCoolerAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.admin && !user.coolerAdmin) {
      return res.status(401).json({ message: 'User is not an administrator' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const protectRecapAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.admin && !user.recapAdmin) {
      return res.status(401).json({ message: 'User is not an administrator' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const protectRFGAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (!user.admin && !user.RFGAdmin) {
      return res.status(401).json({ message: 'User is not an administrator' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.use('/api/auth', authRoutes);

app.use('/api/auth-protected', protect, authProtectedRoutes);

app.use('/api/coolers', protect, coolerRoutes);

app.use('/api/coolers-admin', protectCoolerAdmin, coolerAdminRoutes);

app.use('/api/recaps', protect, recapRoutes);

app.use('/api/recaps-admin', protectRecapAdmin, recapAdminRoutes);

app.use('/api/uploadFile', uploadRouter);

app.use('/api/rfg', protect, rfgRoutes);

app.use('/api/rfg-admin', protectRFGAdmin, rfgAdminRoutes);

app.use('/api/admin', protectAdmin, adminRoutes);

app.listen(8080, () => console.log('Server running on port 8080'));
