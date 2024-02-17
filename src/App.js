import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AuthProvider, { useAuth } from './components/security/AuthContext';
import Todo from './components/Todo';

function AuthenticatedRoute({children}) {
  const authContext = useAuth();
  if (authContext.isAuthenticated)
    return children
  return <Navigate to='/'/>
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Login}/>
            <Route path='/login' Component={Login}/>
            <Route path='/logout' Component={Login}/>

            <Route path='/home/:username' element={
              <AuthenticatedRoute><Home/></AuthenticatedRoute>
            }/>
            <Route path='/todo/:id' element={
              <AuthenticatedRoute><Todo/></AuthenticatedRoute>
            }/>
            
            <Route path='*' Component={NotFound}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
