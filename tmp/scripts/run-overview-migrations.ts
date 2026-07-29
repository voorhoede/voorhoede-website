/**
 * Run batch overview page migrations against TAR env new-data-models.
 */
import { loadEnvFile } from 'node:process';
import { buildClient } from '@datocms/cma-client-node';
import migrateServices from './migrate-services-page.ts';
import migrateContact from './migrate-contact-page.ts';
import migrateEvents from './migrate-events-page.ts';

try {
  loadEnvFile();
} catch {
  // env may already be loaded
}

async function main() {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error('DATOCMS_API_TOKEN is required');
  }

  const client = buildClient({
    apiToken: token,
    environment: 'new-data-models',
  });

  const step = process.argv[2] ?? 'all';

  if (step === 'services' || step === 'all') {
    console.log('--- migrate services ---');
    await migrateServices(client);
  }

  if (step === 'contact' || step === 'all') {
    console.log('--- migrate contact ---');
    await migrateContact(client);
  }

  if (step === 'events' || step === 'all') {
    console.log('--- migrate events ---');
    await migrateEvents(client);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
