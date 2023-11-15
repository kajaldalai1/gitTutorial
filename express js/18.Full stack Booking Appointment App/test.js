const User = require('./models/User');

async function createUser() {
  try {
    const data = await User.create({ name: "waceff", email: "ghkjl@ghj", phonenumber: 46576 });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

createUser();
