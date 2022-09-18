import Strapi from '@strapi/strapi';
import fs from 'fs';

let instance;

export async function setupStrapi() {
  if (!instance) {
    // @ts-ignore
    await Strapi();
    instance = strapi;
    await instance.load();
    await instance.server.mount();
  }
  return instance;
}

export async function cleanupStrapi() {
  const dbSettings = strapi.config.get('database.connections.default.settings');

  //close server to release the db-file
  await strapi.server.httpServer.close();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  // close the connection to the database
  await strapi.server.destroy();
}
