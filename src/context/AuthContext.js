import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [organisations, setOrganisations] = useState([]);

  const login = (data) => {
    const userData = {
      userId: data.user.userid,
      userName: data.user.username,
      mobileno: data.user.mobileno,
      email: data.user.email,
    };
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));

    // because of existing sessionStorage calls
    sessionStorage.setItem('userId', data.user.userid);
    sessionStorage.setItem('mobileno', data.user.mobileno);
    sessionStorage.setItem('userName', data.user.username);
    sessionStorage.setItem('email', data.user.email);
  };

  const isLoggedIn = () => {
    if (user.userId) {
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, isLoggedIn, logout, organisations, setOrganisations }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
