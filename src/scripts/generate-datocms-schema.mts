import { env, loadEnvFile } from 'node:process';
import { generateSchema } from '@gql.tada/cli-utils';
import { datocmsContentApiUrl, datocmsEnvironment } from '../constants.mjs';

loadEnvFile();

await generateSchema({
  input: datocmsContentApiUrl,
  headers: {
    Authorization: env.DATOCMS_API_READ_TOKEN!,
    'X-Exclude-Invalid': 'true',
    'X-Environment': datocmsEnvironment,
  },
  output: undefined,
  tsconfig: undefined,
});
