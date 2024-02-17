import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from './security/AuthContext';

export default function Login () {
    const [username, setUsername] = useState('nayakrranjan');
    const [password, setPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    async function handelSubmit() {
      if (await authContext.login(username, password))
        navigate(`/home/${username}`)
      else
        setShowErrorMessage(true);
    }

    // console.log(username, password);
    return (
        <div className="login-comp">
          <h1>Login</h1>
          <form>
              <input type="text" placeholder='Username' value={username} onChange={event => setUsername(event.target.value)} className='login-input'/>
            <br />
              <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} className='login-input'/>
            <br />
            {showErrorMessage && <div className='err-msg'>Invalid cridentials</div>}
            <input type="button" className='login-button' value="Login" onClick={handelSubmit}/>
          </form>
        </div>
    )
}