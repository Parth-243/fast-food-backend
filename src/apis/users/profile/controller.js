const UserProfile = require('../../../models/userProfile');
const { USER_ROLES, MINIO_USER_BUCKET } = require('../../../../config');
const {
  uploadFiles,
  deleteFile,
} = require('../../common/services/uploadService');

const ROLE = USER_ROLES.USER;

// Create the user profile for the logged-in user
exports.createUserProfile = async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    if (role !== ROLE) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const userProfile = new UserProfile(req.body);
    userProfile.userId = userId;
    await userProfile.save();
    res.status(201).send(userProfile);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get the user profile for the logged-in user
exports.getUserProfile = async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    if (role !== ROLE) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).send({ error: 'User profile not found' });
    }

    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update the user profile for the logged-in user
exports.updateUserProfile = async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    if (role !== ROLE) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'firstName',
      'lastName',
      'dob',
      'gender',
      'mobile',
      'address',
      'state',
      'city',
      'postalCode',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).send({ error: 'User profile not found' });
    }

    updates.forEach((update) => (userProfile[update] = req.body[update]));
    await userProfile.save();

    res.status(200).send(userProfile);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Upload user profile picture
exports.uploadPicture = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send('No profile picture uploaded.');
  }

  try {
    const { _id: userId, role } = req.user;
    if (role !== ROLE) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).send({ error: 'User profile not found' });
    }

    if (userProfile.picture) {
      console.log('Previous picture: ' + userProfile.picture);
      try {
        await deleteFile(userProfile.picture);
        console.log('Previous file deleted successfully.');
      } catch (error) {
        console.error('Error deleting previous file:', error.message);
      }
    }

    const bucketName = MINIO_USER_BUCKET;
    const [fileUrl] = await uploadFiles(bucketName, [file]);
    userProfile.picture = fileUrl;
    await userProfile.save();

    res.status(200).json({
      message: 'Profile picture uploaded successfully.',
      url: fileUrl,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error.message);
    res.status(422).send({ error: error.message });
  }
};
