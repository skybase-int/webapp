import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './Layout';
import { Heading, Text } from './Typography';
import { Button } from '@/components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <Layout>
      <div className="my-6 text-center">
        <Heading variant="large">404</Heading>
        <Text>Page not found</Text>
        <Text>
          You will be redirected back to the homepage after 5 seconds or you can use the button below
        </Text>
        <Link to="/">
          <Button variant="secondary" className="mt-4">
            Back to homepage
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
