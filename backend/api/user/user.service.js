const dbService = require('../../services/db.service');
// const ObjectId = require('mongodb').ObjectId;

module.exports = {
  query,
  // getById,
  getByEmail,
  // remove,
  // update,
  // add,
};

async function query(filterBy = {}) {
  // const criteria = _buildCriteria(filterBy);

  const collection = await dbService.getCollection('user');
  try {
    const users = await collection.find(criteria).toArray();
    users.forEach(user => delete user.password);

    return users;
  } catch (err) {
    console.log('ERROR: cannot find users');
    throw err;
  }
}

// async function getById(userId) {
//   const collection = await dbService.getCollection('user');
//   try {
//     const user = await collection.findOne({ _id: ObjectId(userId) });
//     delete user.password;

//     // // user.givenReviews = await reviewService.query({byUserId: ObjectId(user._id) })
//     // user.givenReviews = user.givenReviews.map(review => {
//     //     delete review.byUser
//     //     return review
//     // })

//     return user;
//   } catch (err) {
//     console.log(`ERROR: while finding user ${userId}`);
//     throw err;
//   }
// }

async function getByEmail(email,res) {
  var conDB = await dbService.getCollection();
  var user = null 
  try {
    await conDB.connect( await function(err) {
      if (err) throw err;
      console.log("Connected!");
    }); 

    user = await conDB.query(`SELECT * FROM users WHERE email = '${email}'  `,async function (err, results) {
      if (err) {
        console.log("ERROR query--->",err);
        throw err; 
      }
      let userJs = JSON.parse(JSON.stringify(results))[0];
      // res.send(user)
      return await userJs;
    });  


    conDB.end()
  } catch (err) {
    console.log(`ERROR: while finding user ${email}`);
    console.log(`ERROR: --->${err}`);
    throw err;
  }
  await console.log("user -> ********", user )
  
  return await user;
}

// async function remove(userId) {
//   const collection = await dbService.getCollection('user');
//   try {
//     await collection.deleteOne({ _id: ObjectId(userId) });
//   } catch (err) {
//     console.log(`ERROR: cannot remove user ${userId}`);
//     throw err;
//   }
// }

// async function update(user) {
//   const collection = await dbService.getCollection('user');
//   user._id = ObjectId(user._id);

//   try {
//     await collection.replaceOne({ _id: user._id }, { $set: user });
//     return user;
//   } catch (err) {
//     console.log(`ERROR: cannot update user ${user._id}`);
//     throw err;
//   }
// }

// async function add(user) {
//   const collection = await dbService.getCollection('user');
//   try {
//     await collection.insertOne(user);
//     return user;
//   } catch (err) {
//     console.log(`ERROR: cannot insert user`);
//     throw err;
//   }
// }

// function _buildCriteria(filterBy) {
//   const criteria = {};
//   if (filterBy.txt) {
//     criteria.username = filterBy.txt;
//   }
//   if (filterBy.minBalance) {
//     criteria.balance = { $gte: +filterBy.minBalance };
//   }
//   return criteria;
// }
