import { useRef, useState, useEffect } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const loginURL = '/auth';

const LoginForm = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(loginURL,
            JSON.stringify({ email, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ email, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        navigate(from, { replace: true });
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing email or password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login failed')
        };
        errRef.current.focus();
    }
  }

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h3>Login</h3>
      <form onSubmit={onSubmit} className={"login_form"}>
        <label htmlFor="email_input">Email</label>
        <input 
          placeholder={"email"} 
          id={"email_input"}
          type='email'
          value={email}
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        <br/>
        <label htmlFor="password_input">Password</label>
        <input 
        placeholder={"password"} 
        id={"password_input"}
        type="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required
        />
        <br/>
        <button type={'submit'}>Sign in</button>
      </form>
      <p>
        Need an account?<br />
        <span className="line">
            <Link to='/register'>Register</Link>
        </span>
    </p>
    </section>
  )
};

export default LoginForm;