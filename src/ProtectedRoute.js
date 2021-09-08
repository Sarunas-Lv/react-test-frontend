import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';

// Screens (pages)
import VotesScreen from './screens/VotesScreen';

const ProtectedRoute = () => {
  // Hooks
  // -- context
  const { state } = useContext(UserContext);

  // -- redirects
  const history = useHistory();

  //   -- side effects
  useEffect(() => {
    // if user not exists - redirecting to login
    if (!state.user) history.push('/');
  });

  if (state.user) {
    return <VotesScreen />;
  } else {
    return null;
  }
};

export default ProtectedRoute;
