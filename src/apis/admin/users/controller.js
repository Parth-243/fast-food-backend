const { USER_ROLES } = require('../../../../config');
const User = require('../../../models/user');

async function getAllCustomers(req, res) {
  try {
    const users = await User.aggregate([
      { $match: { role: USER_ROLES.USER } },
      {
        $lookup: {
          from: 'userprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile',
        },
      },
      {
        $unwind: {
          path: '$profile',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          firstName: { $ifNull: ['$profile.firstName', null] },
          lastName: { $ifNull: ['$profile.lastName', null] },
          dob: { $ifNull: ['$profile.dob', null] },
          gender: { $ifNull: ['$profile.gender', null] },
          mobile: { $ifNull: ['$profile.mobile', null] },
          address: { $ifNull: ['$profile.address', null] },
          state: { $ifNull: ['$profile.state', null] },
          city: { $ifNull: ['$profile.city', null] },
          postalCode: { $ifNull: ['$profile.postalCode', null] },
          picture: { $ifNull: ['$profile.picture', null] },
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
          profile: 0,
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getAllCustomers };
