import { useState } from 'react';
import axios from 'axios';

const AuthPage = (props) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      axios.post('http://localhost:3001/register', { username, password })
        .then(r => props.onAuth({ ...r.data, secret: password }))
        .catch(e => console.log('error', e));
    } else {
      axios.post('http://localhost:3001/authenticate', { username, password })
        .then(r => props.onAuth({ ...r.data, secret: password }))
        .catch(e => console.log('error', e));
    }
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">{isNewUser ? 'Create an account' : 'Login to your account'}</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input 
            className="auth-input" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <div className="auth-label">Password</div>
          <input 
            type="password" 
            className="auth-input" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="auth-button" type="submit">
            {isNewUser ? 'Register' : 'Login'}
          </button>
        </div>
        <div className="toggle-auth">
          <span onClick={() => setIsNewUser(!isNewUser)}>
            {isNewUser ? 'Already have an account? Login' : "Don't have an account? Register"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
