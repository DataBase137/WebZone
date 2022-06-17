import { useEffect } from "react";
import styles from "../styles/Login.module.css";
import Head from "next/head";

const Login = () => {
    useEffect(() => {
        function handleSubmit(event) {
            event.preventDefault();

            const data = new FormData(event.target);

            const value = Object.fromEntries(data.entries());
            
            console.log(value);
        }

        const form = document.querySelector(".loginForm");
        form.addEventListener("submit", handleSubmit);
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
                    <form className="loginForm">
                        <div className={ styles.inputs }>
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
                        </div>
                        <div className={ styles.rememberMeCheck }>
                            <label className={ styles.checkLabel }>
                                <input type="checkbox" name="remember_me" id="remember_me" className={ styles.checkInput } />
                                <span className={ styles.slider }></span>
                            </label>
                            <label className={ styles.remMeLabel }>Remember Me</label>
                        </div>
                        <button type="submit" className={ styles.submitButton }>Login</button>                        
                    </form>
                </div>
            </div>
        </div>
        </>
    )}
 
export default Login;