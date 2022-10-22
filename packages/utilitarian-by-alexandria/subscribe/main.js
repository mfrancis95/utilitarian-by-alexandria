import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB);

export main = async args => {
  try {
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
    body: 'Test'
  };
};
