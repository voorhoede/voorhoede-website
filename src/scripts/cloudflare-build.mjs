import { execSync } from 'node:child_process';
import { buildClient } from '@datocms/cma-client-browser';

const { DATOCMS_API_TOKEN, CF_PAGES, CF_PAGES_BRANCH } = process.env;

/**
 * Notifies DatoCMS about the deployment status.
 * @param {{ status: 'success' | 'error'}}
 */
async function notifyDatocms({ status }) {
  if (!CF_PAGES) {
    console.info('Not on Cloudflare Pages. Skipping notify DatoCMS');
    return;
  }

  const client = buildClient({ apiToken: DATOCMS_API_TOKEN });
  const triggers = await client.buildTriggers.list();
  const matchingTrigger = triggers.find((trigger) => {
    const payload = trigger.adapter_settings?.payload;
    return payload?.branch === CF_PAGES_BRANCH;
  });
  if (!matchingTrigger) {
    console.info(`No matching DatoCMS build trigger found for branch '${CF_PAGES_BRANCH}'`);
    return;
  }

  try {
    await fetch(matchingTrigger.webhook_url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    console.info(`🔔 Notified DatoCMS of deploy status: ${status}`);
  } catch (error) {
    console.error('Error trying to notify DatoCMS of deploy status', { status, error });
  }
}

async function build() {
  try {
    execSync('npm run build', { stdio: 'inherit' });
    await notifyDatocms({ status: 'success' });
  } catch (error) {
    await notifyDatocms({ status: 'error' });
    console.error(error);
    process.exit(1);
  }
}

build();
