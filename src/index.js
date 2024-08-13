import vastDb from './db.js';
import { handleReadFromFile, handleReadFromUrl, handleQueryById } from './controller.js';

const run = async () => {
  await vastDb();

  
  try {
    const filePath = 'test.xml';
    const fileVast = await handleReadFromFile(filePath);
    console.log('Parsed and stored from file:', JSON.stringify(fileVast, null, 2));

    const url = 'https://raw.githubusercontent.com/InteractiveAdvertisingBureau/VAST_Samples/master/VAST%203.0%20Samples/Inline_Companion_Tag-test.xml';
    const urlVast = await handleReadFromUrl(url);
    console.log('Parsed and stored from URL:', JSON.stringify(urlVast, null, 2));

    // Retrieve by ID
    const vastId = urlVast._id; // Use the ID from the stored document
    const queriedVast = await handleQueryById(vastId);
    console.log('Queried VAST by ID:', JSON.stringify(queriedVast, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
};

run();

