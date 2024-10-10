const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");

// MongoDB Connection URI (from your .env)
const uri = process.env.MONGO_URI; 

// Backup directory inside the backend folder
const backupDir = path.join(__dirname, 'backup');

// Ensure the backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Function to perform the backup of MongoDB collections
const backupCollections = async () => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const db = client.db(); // The default database or the one in the connection string

    // Fetch users collection
    const users = await db.collection('users').find().toArray();
    // Fetch messages collection
    const messages = await db.collection('messages').find().toArray();

    // Save to local files
    fs.writeFileSync(path.join(backupDir, `users-backup-${getFormattedDate()}.json`), JSON.stringify(users, null, 2));
    fs.writeFileSync(path.join(backupDir, `messages-backup-${getFormattedDate()}.json`), JSON.stringify(messages, null, 2));

    console.log('Backup completed successfully');
    
    await client.close();
  } catch (error) {
    console.error('Error during backup:', error);
  }
};

// Helper function to get current date in YYYY-MM-DD format
const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}-${month}-${day}`;
};

// Schedule the task to run daily at midnight (00:00)
// You can adjust the cron expression to your desired schedule.
cron.schedule('0 */12 * * *', () => {
  console.log('Running CRON Job for backup at', new Date().toLocaleString());
  backupCollections();
});


//CRON Expression	Meaning
// 0 0 * * *	Every day at midnight
// */15 * * * *	Every 15 minutes
// 0 */12 * * * Every 12 hours