import { useRef, useState, useEffect } from "react";
import { faCheck, faTime, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        console.log(user, pwd);
        setSuccess(true);
    }

    return (
        <>
            {success ?
                (
                    <section>
                        <h1>Registration Successful!</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </section>
                ) :
                (
                    <section>
                        <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <h1>Register</h1>
                        <form className="registration-form" onSubmit={handleSubmit}>
                            <div className="registration-field">
                                <label htmlFor="username">
                                    Username:{" "}
                                    <span className={validName ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validName || !user ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Username must include: <br />
                                    {">"} 4 to 24 characters. <br />
                                    {">"} a letter at the beginning. <br />
                                    {">"} only letters, numbers, underscores and hyphens.
                                </p>
                            </div>

                            <div className="registration-field">
                                <label htmlFor="password">
                                    Password:{" "}
                                    <span className={validPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Password must include: <br />
                                    {">"} 8 to 24 characters. <br />
                                    {">"} uppercase and lowercase letters. <br />
                                    {">"} a number and a special character. <br />
                                    {">"} Allowed special characters:
                                    <span aria-label="exclamation mark">!</span>
                                    <span aria-label="at symbol">@</span>
                                    <span aria-label="hashtag">#</span>
                                    <span aria-label="dollar sign">$</span>
                                    <span aria-label="percent">%</span>
                                </p>
                            </div>
                            <div className="registration-field">
                                <label htmlFor="confirm_pwd">
                                    Confirm password:
                                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </span>
                                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match password.
                                </p>
                            </div>
                            <div className="registration-confirmation">
                                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                                    Sign Up
                                </button>
                            </div>
                            <p className="to-signin">
                                Already have an account?<br />
                                <span className="line">
                                    {/*input router link here*/}
                                    <a href="#">Sign In</a>
                                </span>
                            </p>
                        </form>
                    </section>
                )
            }
        </>
    )
}

export default Register;