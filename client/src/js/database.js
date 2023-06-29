import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('post to db');

  //create connection to db 
  const db = await openDB('jate', 1);

  //create transaction
  const tx = db.transaction('jate', 'readwrite');

  //create store
  const store = tx.objectStore('jate');

  //add content to store
  const request = store.add({content: content});

  //get confirmation of the request
  const result = await request;
  console.log('data added to db', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get from db');

  //create connection to db
  const db = await openDB('jate', 1);

  //create transaction
  const tx = db.transaction('jate', 'readonly');

  //open up the store
  const store = tx.objectStore('jate');

  //user .getAll() to get all the data from the store
  const request = store.getAll();

  //get confirmation of the request
  const result = await request;
  console.log('data retrieved from db', result);
  return result;
};

initdb();
