import { useState, useEffect, useRef } from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";
import Link from "next/link";

const Login = () => {
    const form = useRef();

    useEffect(() => {
        const handleFormSubmit = event => {
            event.preventDefault();
            const data = new FormData(event.target);
            const value = Object.fromEntries(data.entries())

            fetch('http://localhost:4242/login', {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        form.current.addEventListener("submit", handleFormSubmit);
    }, [])

    return (
        <>
            <Head>
                <title>WebZone | Login</title>
            </Head>
            <div className={styles.loginContainer}>
                <div className={styles.loginModule}>
                    <div className={styles.loginEmail}>
                        <h1 className={styles.emailHeader}>Login</h1>
                        <form ref={form}>
                            <div className={styles.inputs}>
                                <div className={styles.textInputDiv}>
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        type="username"
                                        name="username"
                                        id="username"
                                        required
                                        placeholder=" "
                                        autoComplete="no" />
                                    <span className={styles.floatingLabel}><label htmlFor="username">Username</label></span>
                                </div>
                                <div className={styles.textInputDiv}>
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        type="password"
                                        name="password"
                                        id="password"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        placeholder=" "
                                        required />
                                    <span className={styles.floatingLabel}><label htmlFor="password">Password</label></span>
                                </div>
                            </div>
                            <p className={styles.signUpRedirect}>Not a user? <Link href="/signup"><a>Sign Up</a></Link></p>
                            <button type="submit" className={styles.submitButton}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;