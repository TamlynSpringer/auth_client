import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from '../../api/axios'

// const user_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const registerURL = '/register'

function NewUserForm() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [roles, setRoles] = useState('user');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidEmail(email_regex.test(email));
  }, [email])

  useEffect(() => {
      setValidPwd(pwd_regex.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // secondary validation
    const v1 = email_regex.test(email);
    const v2 = pwd_regex.test(pwd);
    if (!v1 || !v2) {
      setErrMsg('Invalid entry');
      return;
    }
    console.log(email, pwd, roles); 
      try {
        const response = await axios.post(registerURL,
            { email: email, pwd: pwd, roles: roles },
            {
                headers: { 'Content-Role': 'application/json' },
                withCredentials: true
            }
        );
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setEmail(''); 
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No server response');
        } else if (err.response?.status === 409) {
            setErrMsg('Email already in use');
        } else {
            setErrMsg('Registration failed')
        }
        errRef.current.focus();
    }
  };


  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p><Link to='/auth'>Sign in</Link></p>
        </section>

      ) : (
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h3>Create new user</h3>
        <form onSubmit={onSubmit} className={"create_email_form"}>
          <label htmlFor="email_input">Email
            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
          </label>
          <input 
          placeholder={"email"} 
          id={"email_input"} 
          type='email'
          autoFocus
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          />
          <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp; Must be in format name@domain<br />
            For example: jsmith@example.com<br />
          </p>
          <br/>

          <label htmlFor="password_input">Password
            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
          </label>
          <input 
          placeholder={"password"} 
          type="password"
          id={"password_input"}
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          />
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

          <br/>
          <label htmlFor="confirmed_password_input">Confirm password
            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />                      
          </label>
          <input 
          placeholder={"confirm password"} 
          id={"confirmed_password_input"}
          type="password"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
          </p>

          <br/>
          <label htmlFor="role_input">Role of user</label>
          <select placeholder={"role"} id={"role_input"}
          onChange={(e) => setRoles(e.target.value)}
          value={roles}>
            <option value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
          </select>

          <br/>
          <button type={"submit"} disabled={!validEmail || !validPwd || !validMatch || !roles ? true : false}>Sign up</button>
        </form>

        <p>
          Already registered?<br />
          <span className="line">
              <Link to='/auth' element={< LoginForm/>}>Login</Link>
          </span>
        </p>
      </section>
      )}
    </>
  )
};

export default NewUserForm;