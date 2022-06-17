import { useState, useEffect, useRef } from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import Link from "next/link";

const Login = () => {
    const form = useRef();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const handleFormSubmit = event => {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries())
            const dataSend = {"name": value.username, "password": value.password}
            if (value.remember_me === "on") {
                setRememberMe(true);
            } else {
                setRememberMe(false);
            }
        }

        form.current.addEventListener("submit", handleFormSubmit);
    }, [])

    return (
        <>
        <Head>
            <title>WebZone | Login</title>
        </Head>
        <div className={ styles.loginContainer}>
            <div className={ styles.loginModule }>
                <div className={ styles.loginEmail }>
                    <h1 className={ styles.emailHeader }>Login</h1>
                    <form ref={ form }>
                        <div className={ styles.inputs }>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input
                                className={ styles.textInput }
                                type="username"
                                name="username"
                                id="username"
                                required
                                placeholder=" "
                                autoComplete="no" />
                                <span className={ styles.floatingLabel }><label htmlFor="username">Username</label></span>
                            </div>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input
                                className={ styles.textInput }
                                type="password"
                                name="password"
                                id="password"
                                placeholder=" "
                                required />
                                <span className={ styles.floatingLabel }><label htmlFor="password">Password</label></span>
                            </div>
                        </div>
                        <div className={ styles.rememberMeCheck }>
                            <label className={ styles.checkLabel }>
                                <input
                                type="checkbox"
                                name="remember_me"
                                className={ styles.checkInput } />
                                <span className={ styles.slider }></span>
                            </label>
                            <label className={ styles.remMeLabel }>Remember Me</label>
                        </div>
                        <p className={ styles.signUpRedirect }>Not a user? <Link href="/login"><a>Sign Up</a></Link></p>
                        <button type="submit" className={ styles.submitButton }>Login</button>                        
                    </form>
                </div>
            </div>
        </div>
        </>
    )}
 
export default Login;