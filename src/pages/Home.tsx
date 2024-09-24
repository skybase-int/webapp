import React from 'react';
import { Layout } from '../modules/layout/components/Layout';
import { Landing } from '../modules/app/Landing';

function Home(): React.ReactElement {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
}

export default Home;
