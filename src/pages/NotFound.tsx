import React from 'react';
import Head from 'next/head';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Head>
        <title>Page Not Found - ProjectHub Dashboard</title>
        <meta name="description" content="The page you are looking for could not be found" />
      </Head>

      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="flex justify-center items-center mb-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <Icon name="FileQuestion" size={48} className="text-muted-foreground" />
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              iconName="Home"
              iconPosition="left"
              onClick={handleGoHome}
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;