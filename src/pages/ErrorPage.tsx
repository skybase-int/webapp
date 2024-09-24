import React from 'react';
import { Layout } from '../modules/layout/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heading } from '@/modules/layout/components/Typography';

function ErrorPage(): React.ReactElement {
  return (
    <Layout>
      <div className="my-6 text-center">
        <Heading variant="large">Something went wrong</Heading>

        <Link to="/">
          <Button variant="secondary" className="ml-4 mt-4">
            Back to homepage
          </Button>
        </Link>
      </div>
    </Layout>
  );
}

export default ErrorPage;
