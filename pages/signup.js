import { useState, useEffect, useRef } from "react";
import styles from "../styles/Signup.module.css";
import Head from "next/head";
import Link from "next/link";

const Signup = () => {
    const password = useRef();
    const confirmpassword = useRef();
    const form = useRef();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const handleFormSubmit = event => {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries())
            const dataSend = {"name": value.username, "email": value.email, "password": value.password}
            if (value.remember_me === "on") {
                setRememberMe(true);
            } else {
                setRememberMe(false);
            }
        }

        form.current.addEventListener("submit", handleFormSubmit);
    }, [])

    useEffect(() => {
        confirmpassword.current.addEventListener("input", function (event) {
        if (password.current.value != confirmpassword.current.value) {
            confirmpassword.current.setCustomValidity("Passwords do not match.");
        } else {
            confirmpassword.current.setCustomValidity("");
        }            
        })  
    })

    return (
        <>
        <Head>
            <title>WebZone | Sign Up</title>
        </Head>
        <div className={ styles.signupContainer}>
            <div className={ styles.signupModule }>
                <div className={ styles.signupEmail }>
                    <h1 className={ styles.emailHeader }>Sign Up</h1>
                    <form ref={ form }>
                        <div className={ styles.inputs }>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input 
                                className={ styles.textInput }
                                type="username"
                                name="username"
                                id="username"
                                placeholder=" "
                                required
                                minLength="3"
                                maxLength="21"
                                pattern="[A-Za-z0-9_]{1,}"
                                autoComplete="no" />
                                <span className={ styles.floatingLabel }><label htmlFor="username">Username (3-15 chars no special)</label></span>
                            </div>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input
                                className={ styles.textInput }
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder=" "
                                autoComplete="no"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="This is not a valid email address." />
                                <span className={ styles.floatingLabel }><label htmlFor="email">Email (Please enter a valid email address)</label></span>
                            </div>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input
                                className={ styles.textInput }
                                ref={ password }
                                type="password"
                                name="password"
                                placeholder=" "
                                id="password"
                                required
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Your password must match the specified format." />
                                <span className={ styles.floatingLabel }><label htmlFor="password">Password (8+ chars, 1 upper, lower, and number)</label></span>
                            </div>
                            <div className={ styles.textInputDiv} >
                                <br />
                                <input
                                className={ styles.textInput }
                                ref={ confirmpassword }
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                placeholder=" "
                                required />
                                <span className={ styles.floatingLabel }><label htmlFor="confirm_password">Confirm Password (Retype Password)</label></span>
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
                        <p className={ styles.loginRedirect }>Already a user? <Link href="/login"><a>Login</a></Link></p>
                        <button type="submit" className={ styles.submitButton }>Sign Up</button>                        
                    </form>
                </div>
            </div>
        </div>
        </>
    )}
 
export default Signup;