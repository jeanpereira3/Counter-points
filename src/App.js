import './App.css';
//Context
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import NavBottom from './components/NavBottom/NavBottom';
import Players from './pages/Players/Players';
import CreatedPlayer from './pages/CreatedPlayer/CreatedPlayer';

import CircularIndeterminate from './components/CircularIndeterminate/CircularIndeterminate';


function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <CircularIndeterminate></CircularIndeterminate>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar></NavBar>
          <div className="container">
            <Routes>
              <Route
                path='/'
                element={!user ? <Register></Register> : <Navigate to='/home' />}
              />
              <Route
                path='/home'
                element={user ? <Home></Home> : <Navigate to='/register' />}
              />
              <Route path='/about' element={<About></About>} />
              <Route path='/search' element={<Search></Search>} />
              <Route
                path='/login'
                element={!user ? <Login></Login> : <Navigate to='/home' />}
              />
              <Route
                path='/register'
                element={!user ? <Register></Register> : <Navigate to='/home' />}
              />
              <Route
                path='/players'
                element={user ? <Players></Players> : <Navigate to='/login' />}
              />
              <Route
                path='/player/create'
                element={user ? <CreatedPlayer></CreatedPlayer> : <Navigate to='/login' />}
              />

            </Routes>
          </div>
          <NavBottom></NavBottom>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}

export default App;
