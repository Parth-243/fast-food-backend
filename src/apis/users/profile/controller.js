const UserProfile = require('../../../models/userProfile');
const { USER_ROLES } = require('../../../../config');

const ROLE = USER_ROLES.USER;

// Create the user profile for the logged-in user
exports.createUserProfile = async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    console.log(userId, role);
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
