import { Storage } from '@google-cloud/storage';
import { properties } from '../../config/properties.js';

const storage = new Storage({
  projectId: properties.GCS.PROJECT_ID,
  keyFilename: properties.GCS.KEYFILENAME,
});

const bucket = storage.bucket(properties.GCS.BUCKET_NAME);

export const uploadFileToGCS = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => reject(err));

    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(`https://storage.googleapis.com/${bucket.name}/${file.name}`);
      });
    });

    stream.end(fileBuffer);
  });
};

export default storage;