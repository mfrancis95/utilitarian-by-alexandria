const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB);

exports.main = async args => {
  try {
    await client.connect();
    console.log('Connected to database');
    await client.db('admin').collection('emails').insertOne({
      email: args.email
    });
    console.log(`Successfully subscribed ${args.email}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
  return {
    headers: {
      Location: 'http://utilitarianbyalexandria.com/subscribed.html'
    },
    status: 302
  };
};
