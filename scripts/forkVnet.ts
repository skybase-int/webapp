import { writeFile } from 'fs/promises';

// Parent containers seem to have errors intermittently, switch container ID's if necessary
// corresponds to https://dashboard.tenderly.co/jetstreamgg/jetstream/testnet/a87c4fd8-92f0-403d-a95e-d9e39b6c3c48
// const JETSTREAM_CONTAINER_ID = 'a87c4fd8-92f0-403d-a95e-d9e39b6c3c48'

// corresponds to https://dashboard.tenderly.co/jetstreamgg/jetstream/testnet/a3cdcbc9-56a7-4583-bb2d-705f3bd58e43
const ENDGAME0_CONTAINER_ID = 'a3cdcbc9-56a7-4583-bb2d-705f3bd58e43';

const forkVnet = async (displayName: string) => {
  if (!displayName.length) {
    throw new Error('A display name is required for the virtual testnet');
  }
  const res = await fetch(
    'https://api.tenderly.co/api/v1/account/jetstreamgg/project/jetstream/testnet/clone',
    {
      headers: [
        ['accept', 'application/json, text/plain, */*'],
        ['content-type', 'application/json'],
        ['X-Access-Key', `${process.env.TENDERLY_API_KEY}`]
      ],
      method: 'POST',
      body: JSON.stringify({
        srcContainerId: ENDGAME0_CONTAINER_ID,
        dstContainerDisplayName: displayName
      })
    }
  );

  // Wait a few seconds to let the vnet clone operation complete
  await new Promise(resolve => setTimeout(resolve, 10000));

  const testnetData = await res.json();

  if (res.status !== 200) {
    console.error('There was an error while forking the virtual testnet:', testnetData);
    process.exit(1);
  }

  console.log('Virtual Testnet successfully forked');

  const adminEndpoint = testnetData.connectivityConfig.endpoints.find(
    //@ts-ignore
    x => (x.description === 'admin endpoint' || x.description === 'unlocked endpoint') as boolean
  );

  if (!adminEndpoint) {
    console.error('The admin endpoint was not found');
    process.exit(1);
  }

  await writeFile(
    './tenderlyTestnetData.json',
    JSON.stringify({
      TENDERLY_TESTNET_ID: testnetData.id,
      TENDERLY_RPC_URL: adminEndpoint.uri
    })
  );
};

const displayName = process.argv[2];
forkVnet(displayName);
