import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

// importing contexts
import { searchBarContext } from "../../../App";

const RegisterUI = ({
  formHook: { onChange, form, submitForm, loading, fieldErrors },
}) => {
  // local state management
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [pwdVisible, setPwdVisible] = useState(false);
  const [isPwdError, setIsPwdError] = useState(false);
  const [pwdErrorMsg, setPwdErrorMsg] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // using imported context
  const {
    isSearchBarVisible,
    setIsSearchBarVisible,
    setSearchBarVisibleClass,
    setSearchBarClass,
  } = useContext(searchBarContext);

  // hiding search bar by default
  useEffect(() => {
    if (isSearchBarVisible) {
      setIsSearchBarVisible(() => false);
      setSearchBarVisibleClass(() => "search_hidden_body h-100 w-100");
      setSearchBarClass(() => "search_bar_hidden pos_abs fcc w-100");
    }
  }, []);

  // error handling - after getting response
  useEffect(() => {
    if (fieldErrors?.username) {
      setUsernameErrorMsg(() => fieldErrors.username);
      setIsUsernameError(() => true);
    } else {
      setUsernameErrorMsg(() => "Invalid email/mobile number.");
      setIsUsernameError(() => false);
    }
    if (fieldErrors?.password) {
      setPwdErrorMsg(() => fieldErrors.password);
      setIsPwdError(() => true);
    } else {
      setPwdErrorMsg(() => "Password must be 8 characters long.");
      setIsPwdError(() => false);
    }
  }, [fieldErrors]);

  // handleSignUp
  const handleSignUp = async (e) => {
    e.preventDefault();

    // regex for email format
    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // validate email - frontend
    if (form?.username) {
      if (!email_regex.test(String(form.username).toLowerCase())) {
        setIsUsernameError(() => true);
        return;
      } else {
        setIsUsernameError(() => false);
      }
    } else {
      setIsUsernameError(() => true);
      return;
    }

    // validate password - frontend
    if (form?.password) {
      if (form.password.length < 8) {
        setPwdErrorMsg(() => "Password must be at least 8 characters long.");
        setIsPwdError(() => true);
        return;
      } else if (form.password !== form.cnfPassword) {
        setPwdErrorMsg(() => "Your password didn't match.");
        setIsPwdError(() => true);
        return;
      } else {
        setIsPwdError(() => false);
        // proceed to signup
        submitForm();
      }
    } else {
      setPwdErrorMsg(() => "Password must be at least 8 characters long.");
      setIsPwdError(() => true);
      return;
    }
  };

  // renderViewPwdBtn
  const renderViewPwdBtn = () => {
    if (!pwdVisible) {
      return (
        <button
          type="button"
          className="btn fccc input_assist_btn input_assist_btn_pos cur"
          onClick={() => {
            setPwdVisible(() => {
              return true;
            });
          }}
        >
          <i className="fas fa-eye"></i>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn fccc input_assist_btn input_assist_btn_pos cur"
          onClick={() => {
            setPwdVisible(() => {
              return false;
            });
          }}
        >
          <i className="fas fa-eye-slash"></i>
        </button>
      );
    }
  };

  // renderContinueBtn
  const renderContinueBtn = () => {
    if (agreeTerms && !loading) {
      return (
        <button
          className="btn btn_pri m_r_t-32 h-40 bb fcc w-100 bg_pri cur fc_white fsm round-8 fwb"
          type="submit"
        >
          REGISTER NOW
        </button>
      );
    } else if (agreeTerms && loading) {
      return (
        <button
          className="btn m_r_t-32 h-40 bb fcc w-100 bg_pri fc_white fsm round-8 fwb"
          type="button"
        >
          <i className="fas fa-spinner fa-spin"></i>
        </button>
      );
    } else {
      return (
        <button
          className="btn m_r_t-32 h-40 bb fcc w-100 bg-light-gray fc_gray fsm round-8 fwb"
          type="button"
        >
          Agree TnC to continue
        </button>
      );
    }
  };

  return (
    <div className="fccc h-100 w-100">
      <div className="fcc fsxl h-80 w-80 bg_pink_grad fc_white round-complete shadow_0-0-6-light z-10">
        <i className="fas fa-user-plus"></i>
      </div>
      <form
        className="login_box mar_t--40 fccc bg_white shadow_0-0-4-light"
        onSubmit={handleSignUp}
      >
        <div className="fsxl fwb m_r_t-32">Sign up</div>
        <div className="m_r_t-16 fss fwb">Create your account and join us.</div>

        <div className="fsxs m_r_t-32 w-100">E-mail/Mobile number:</div>
        <input
          type="text"
          name="username"
          placeholder="Enter email-id/mobile number"
          className="w-100 h-40 mar_t-4 inp_pri pad_0-8 fsm focus-blur fwb"
          value={form.username || ""}
          onChange={onChange}
        />
        {isUsernameError && (
          <div className="fc_err fsxs w-100 mar_t-4">{usernameErrorMsg}</div>
        )}
        <div className="fsxs m_r_t-8 w-100">Password:</div>
        <div className="fcc w-100 pos_rel">
          <input
            type={pwdVisible ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            className="w-100 h-40 mar_t-4 inp_pri pad_0-8 fsm focus-blur fwb"
            value={form.password || ""}
            onChange={onChange}
          />
          {renderViewPwdBtn()}
        </div>
        <div className="fcc w-100 pos_rel">
          <input
            type="password"
            name="cnfPassword"
            placeholder="Confirm password"
            className="w-100 h-40 mar_t-4 inp_pri pad_0-8 fsm focus-blur fwb"
            value={form.cnfPassword || ""}
            onChange={onChange}
          />
          {/* {renderViewPwdBtn()} */}
        </div>
        {isPwdError && (
          <div className="fc_err fsxs w-100 mar_t-4">{pwdErrorMsg}</div>
        )}
        <div className="fcc w-100 m_r_t-16">
          <input
            type="checkbox"
            name="agreeTerms"
            name="keepMeLoggedIn"
            id="keepMeLoggedIn"
            className="cur"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
            }}
          />
          <label className="w-100 mar_l-8 fsxs cur" htmlFor="keepMeLoggedIn">
            I agree to Workgent's{" "}
            <Link className="link link-active fwb" to="/terms" target="_blank">
              Terms {"&"} conditions
            </Link>{" "}
            and{" "}
            <Link
              className="link link-active fwb"
              to="/privacy_policy"
              target="_blank"
            >
              Privacy policy
            </Link>
            .
          </label>
        </div>
        {renderContinueBtn()}
      </form>
      <div className="login_box fc_bw mar_t-4 fsm w-100 bb">
        <Link className="link fc-5c fwb" to="/login">
          Already registered? SIGN IN
        </Link>
        <div>
          <Link className="link fc-5c" to="/terms" target="_blank">
            Terms
          </Link>
          <Link className="mar_l-16 link fc-5c" to="/help" target="_blank">
            Help
          </Link>
        </div>
      </div>
      <div className="m_r_t-32 fsxs fwb fc_8a">Copyright © Workgent 2020.</div>
    </div>
  );
};

export default RegisterUI;
