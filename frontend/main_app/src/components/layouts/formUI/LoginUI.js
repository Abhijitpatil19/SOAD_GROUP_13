import React, { useState } from "react";

import { Link } from "react-router-dom";

const Login = ({ formHook: { onChange, form, submitForm, loading, data } }) => {
  // local state management
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);

  // handleLoginAndRedirectBack
  const handleLoginAndRedirectBack = async (e) => {
    e.preventDefault();

    // verify username and password fields
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
      setIsPasswordError(() => false);
    } else {
      setIsPasswordError(() => true);
      return;
    }

    // final submit form - received from formHook
    submitForm();
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
    if (loading) {
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
          className="btn btn_pri m_r_t-32 h-40 bb fcc w-100 bg_pri cur fc_white fsm round-8 fwb"
          type="submit"
        >
          CONTINUE
        </button>
      );
    }
  };

  return (
    <div className="fccc h-100 w-100">
      <div className="fcc fsxl h-80 w-80 bg_pink_grad fc_white round-complete shadow_0-0-6-light z-10">
        <i className="fas fa-user-lock"></i>
      </div>
      <form
        className="login_box mar_t--40 fccc bg_white shadow_0-0-4-light"
        onSubmit={handleLoginAndRedirectBack}
      >
        <div className="fsxl fwb m_r_t-32">Sign in</div>
        <div className="m_r_t-16 fss fwb">
          Hello {data?.username ? data.username + "," : "user,"} please login
          here
        </div>
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
          <div className="fc_err fsxs w-100 mar_t-4">
            Invalid email address.
          </div>
        )}
        <div className="fsxs w-100 mar_t-8">Password:</div>
        <div className="fcc w-100 pos_rel">
          <input
            type={pwdVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-100 h-40 mar_t-4 inp_pri pad_0-8 fsm focus-blur fwb"
            value={form.password || ""}
            onChange={onChange}
          />
          {renderViewPwdBtn()}
        </div>
        {isPasswordError && (
          <div className="fc_err fsxs w-100 mar_t-4">
            This field is required.
          </div>
        )}
        <Link
          className="link link-active fwb fsm mar_t-8 w-100 align-r"
          to="/recover/password"
        >
          Forgot password?
        </Link>
        <div className="fcc w-100 m_r_t-16">
          <input
            type="checkbox"
            name="keepMeLoggedIn"
            id="keepMeLoggedIn"
            className="cur"
            checked={keepMeSignedIn}
            onChange={(e) => {
              setKeepMeSignedIn(e.target.checked);
            }}
          />
          <label className="w-100 mar_l-4 fsm cur" htmlFor="keepMeLoggedIn">
            Keep me logged in
          </label>
        </div>
        {renderContinueBtn()}
      </form>
      <div className="login_box fc_bw mar_t-4 fsm w-100">
        <Link className="link fc-5c fwb" to="/register">
          New to workgent? SIGN UP
        </Link>
        <div>
          <Link className="link fc-5c" to="/terms">
            Terms
          </Link>
          <Link className="mar_l-16 link fc-5c" to="/help">
            Help
          </Link>
        </div>
      </div>
      <div className="m_r_t-32 fsxs fwb fc_8a">Copyright © Workgent 2020.</div>
    </div>
  );
};

export default Login;
