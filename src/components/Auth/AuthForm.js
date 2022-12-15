import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import axios from "axios";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    //optional : add validation
    let url = "https://pre-onboarding-selection-task.shop";
    if (isLogin) {
      url = `${url}/auth/signin`;
    } else {
      url = `${url}/auth/signup`;
    }

    axios({
      method: "POST",
      url: url,
      data: {
        email: enteredEmail,
        password: enteredPassword,
      },
    })
      .then((res) => {
        setIsLoading(false);

        if (res.data.access_token) {
          // success
          console.log("data", res.data);
          return res;
        } else {
          // return;
          return (data) => {
            //show an error modal
            let errorMessage = "Authrntication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          };
        }
      })
      .then((res) => {
        authCtx.login(res.data.access_token);

        console.log("res", res);
        console.log("res.data", res.data);
        console.log("acc_t", res.data.access_token);

        history.replace("/todos");
        //뒤로가기 버튼으로 뒤로 갈 수 없도록 -> replace
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
        setIsLoading(false);
        throw new Error(error);
      });
  };

  const emailInput = (e) => {
    setEmail(e.target.value);
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPassWordError(false);
    } else if (e.target.value.length >= 8) {
      setPassWordError(true);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            onChange={emailInput}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            onChange={passwordInput}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
