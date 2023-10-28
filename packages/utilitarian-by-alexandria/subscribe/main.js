const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB);

exports.main = async args => {
  try {
    await client.connect();
    console.info('Connected to database');
    await client.db('admin').collection('emails').insertOne({
      email: args.email
    });
    console.info(`Successfully subscribed ${args.email}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
  return {
    headers: {
      Location: 'https://utilitarianbyalexandria.com/subscribed.html'
    },
    statusCode: 302
  };
};
