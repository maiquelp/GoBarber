import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isprivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isprivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (isprivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: isprivate ? '/' : '/dashboard', state: { from: location } }} />
      ))}
    />
  );
};

export default Route;
