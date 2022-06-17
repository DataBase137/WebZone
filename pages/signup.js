import { useEffect } from "react";
import styles from "../styles/Signup.module.css";
import Head from "next/head";

const Signup = () => {
    useEffect(() => {
        function handleSubmit(event) {
            event.preventDefault();

            const data = new FormData(event.target);

            const value = Object.fromEntries(data.entries());
            
            console.log(value);
        }

        const form = document.querySelector(".signUpForm");
        form.addEventListener("submit", handleSubmit);
    }, [])

    return (
        <>
        <Head>
            <title>WebZone | Sign Up</title>
        </Head>
        <div className={ styles.signupContainer}>
            <div className={ styles.signupModule }>
                <div className={ styles.signupEmail }>
                    <h1 className={ styles.emailHeader }>Sign Up</h1>
                    <form className="signUpForm">
                        <div className={ styles.inputs }>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input className={ styles.textInput } type="username" name="username" id="username" placeholder=" " required autoComplete="no" />
                                <span className={ styles.floatingLabel }>Username</span>
                            </div>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input className={ styles.textInput } type="email" name="email" id="email" required placeholder=" " autoComplete="no" />
                                <span className={ styles.floatingLabel }>Email</span>
                            </div>
                            <div className={ styles.textInputDiv }>
                                <br />
                                <input className={ styles.textInput } type="password" name="password" id="password" placeholder=" " required />
                                <span className={ styles.floatingLabel }>Password</span>
                            </div>
                            <div className={ styles.textInputDiv} >
                                <br />
                                <input className={ styles.textInput } type="password" name="confirm_password" placeholder=" " id="confirm_password" required />
                                <span className={ styles.floatingLabel }>Confirm Password</span>
                            </div>
                        </div>
                        <div className={ styles.rememberMeCheck }>
                            <label className={ styles.checkLabel }>
                                <input type="checkbox" name="remember_me" id="remember_me" className={ styles.checkInput } />
                                <span className={ styles.slider }></span>
                            </label>
                            <label className={ styles.remMeLabel }>Remember Me</label>
                        </div>
                        <button type="submit" className={ styles.submitButton }>Sign Up</button>                        
                    </form>
                </div>
            </div>
        </div>
        </>
    )}
 
export default Signup;