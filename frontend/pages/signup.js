import { useEffect, useRef, useState } from "react";
import styles from "../styles/Signup.module.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
    // Lots of different things
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmpassword = useRef();
    const form = useRef();
    const [usernameWorks, setUsernameWorks] = useState(true);
    const [emailWorks, setEmailWorks] = useState(true);
    const router = useRouter();

    const handleFormSubmit = async (event) => {
        // Prevents usual form submission
        event.preventDefault();
        // Formats the data for the form
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries())

        // Sends the form data to the backend
        const result = await fetch('http://localhost:4242/signup', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        var response = await result.json();

        // Checks what's happening with the username and email
        if (response.success) {
            setUsernameWorks(true);
            setEmailWorks(true);
            router.push("/");

            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
        } else {
            if (response.validities[0]) {
                setUsernameWorks(false);
            }

            if (response.validities[1]) {
                setEmailWorks(false);
            }
        }
    }

    useEffect(() => {
        // Fires the function when the form is submitted
        form.current.addEventListener("submit", handleFormSubmit);
    }, [])

    useEffect(() => {
        // Make sure that the confirm password matches the password
        confirmpassword.current.addEventListener("input", function (event) {
            if (password.current.value != confirmpassword.current.value) {
                confirmpassword.current.setCustomValidity("Passwords do not match.");
            } else {
                confirmpassword.current.setCustomValidity("");
            }
        })
        // Set the username and email to work or not
        if (usernameWorks === true) {
            username.current.setCustomValidity("");
        } else if (usernameWorks === false) {
            username.current.setCustomValidity("Username taken");
        }

        if (emailWorks === true) {
            email.current.setCustomValidity("")
        } else if (emailWorks === false) {
            email.current.setCustomValidity("Email taken");
        }
    })

    return (
        <>
            <Head>
                <title>WebZone | Sign Up</title>
            </Head>
            <div className={styles.signupContainer}>
                <div className={styles.signupModule}>
                    <div className={styles.signupEmail}>
                        <h1 className={styles.emailHeader}>Sign Up</h1>
                        <form ref={form}>
                            <div className={styles.inputs}>
                                <div className={styles.textInputDiv}>
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        ref={username}
                                        type="username"
                                        name="username"
                                        id="username"
                                        placeholder=" "
                                        required
                                        minLength="3"
                                        maxLength="21"
                                        pattern="[A-Za-z0-9_]{1,}"
                                        onChange={() => { setUsernameWorks(true) }}
                                        autoComplete="no" />
                                    <span className={styles.floatingLabel}><label htmlFor="username">Username (3-21 chars no special)</label></span>
                                </div>
                                <div className={styles.textInputDiv}>
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        ref={email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder=" "
                                        autoComplete="no"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        onChange={() => { setEmailWorks(true) }}
                                        title="This is not a valid email address." />
                                    <span className={styles.floatingLabel}><label htmlFor="email">Email (Please enter a valid email address)</label></span>
                                </div>
                                <div className={styles.textInputDiv}>
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        ref={password}
                                        type="password"
                                        name="password"
                                        placeholder=" "
                                        id="password"
                                        autoComplete="no"
                                        required
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Your password must match the specified format." />
                                    <span className={styles.floatingLabel}><label htmlFor="password">Password (8+ chars, 1 upper, lower, and number)</label></span>
                                </div>
                                <div className={styles.textInputDiv} >
                                    <br />
                                    <input
                                        className={styles.textInput}
                                        ref={confirmpassword}
                                        type="password"
                                        name="confirm_password"
                                        id="confirm_password"
                                        placeholder=" "
                                        autoComplete="no"
                                        form="nosubmit"
                                        required />
                                    <span className={styles.floatingLabel}><label htmlFor="confirm_password">Confirm Password (Retype Password)</label></span>
                                </div>
                            </div>
                            <p className={styles.loginRedirect}>Already a user? <Link href="/login"><a>Login</a></Link></p>
                            <button type="submit" className={styles.submitButton}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// module.exports = { "name": "database" };

export default Signup;