const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB);

exports.main = async args => {
  try {
    console.info('Connecting to database');
    await client.connect();
    console.info('Connected to database');
    console.info('Inserting email into database');
    await client.db('admin').collection('emails').insertOne({
      email: args.email
    });
    console.info(`Successfully subscribed ${args.email}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.info('Closing database connection');
    await client.close();
    console.info('Database connection closed');
  }
  return {
    headers: {
      Location: 'https://utilitarianbyalexandria.com/subscribed.html'
    },
    statusCode: 302
  };
};
