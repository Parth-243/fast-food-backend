const UserProfile = require('../../../models/userProfile');

// Create a new user profile
exports.createUserProfile = async (req, res) => {
  try {
    const userProfile = new UserProfile(req.body);
    userProfile.userId = req.user._id;
    await userProfile.save();
    res.status(201).send(userProfile);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get the user profile for the logged-in user
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).send({ error: 'User profile not found' });
    }

    res.status(200).send(userProfile);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a user profile by ID
exports.updateUserProfile = async (req, res) => {
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

  try {
    const userId = req.user._id;
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
