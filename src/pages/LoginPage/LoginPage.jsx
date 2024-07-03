// eslint-disable-next-line no-unused-vars
import React from 'react';
import './login.css';

import Button from '../../components/shared/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/shared/Input';

function LoginPage() {
  const form = useForm();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(Login(data)).then((res) => {
      if (res.payload.ok) {
        navigate('/');
      } else {
        // console.log("show");
      }
    });
  }

  return (
    <>
      <main className="login">
        <div className="spacing" />
        <div className="tcl-container">
          <div className="tcl-row">
            <div className="tcl-col-12 tcl-col-sm-6 block-center">
              <h1 className="form-title text-center">Login</h1>
              <div className="form-login-register">
                <div>
                  {Object.values(errors).length > 0 && (
                    Object.values(errors).map((item, index) => (
                      <p key={index}>{item.message}</p>
                    ))
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    {/* <input type="text" {...register("username", {
                      required: "username batbuoc nhap", maxLength: {
                        value: 10,
                        message: " tối da 10 kí tư"
                      }
                    })} /> */}
                    <Input
                      label="Username"
                      type="text"
                      placeholder="Enter Username ..."
                      register={{
                        ...register('username', {
                          required: 'Username bắt buộc nhập',
                          maxLength: {
                            value: 10,
                            message: 'Tối đa 10 kí tự',
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="form-control">
                    {/* <input type="password"  {...register("password", {
                      required: "username batbuoc nhap", minLength: {
                        value: 6,
                        message: " tối da 6 kí tư"
                      }
                    })} /> */}
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter Password ..."
                      register={{
                        ...register('password', {
                          required: 'Password bắt buộc nhập',
                          minLength: {
                            value: 6,
                            message: 'Tối thiểu 6 kí tự',
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="d-flex tcl-jc-between tcl-ais-center">
                    <Button htmlType="submit" size="large" type="primary">
                      Submit
                    </Button>
                    <a href="register.html">Register</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing" />
      </main>
    </>
  );
}

export default LoginPage;
