import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Screens (pages)
import HomeScreen from './screens/HomeScreen';
import ProtectedRoute from './ProtectedRoute';
import Header from './Components/Header';
import Footer from './Components/Footer';

// CSS
import './styles/global.css';
// CONTEXT
export const UserContext = React.createContext();

// STATE MANAGEMENT
// -- global
const initialState = { user: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { user: action.payload };
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: '' };
    default:
      return state;
  }
};

function App() {
  //  Hooks
  // -- state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Header />
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/votes' component={ProtectedRoute} />
          </Switch>
        </Router>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
