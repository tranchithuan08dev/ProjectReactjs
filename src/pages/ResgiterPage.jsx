import '../pages/LoginPage/login.css';
import Input from "../components/shared/Input";
import Button from '../components/shared/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Resgiter } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: yup.string().required("Email bắt buộc nhập").email("Email không hợp lệ"),
  username: yup.string().required("Username bắt buộc nhập").max(10, 'Username chỉ cho 10 kí tự'),
  password: yup.string().required("Password bắt buộc nhập").min(6, 'Password phải có ít nhất 6 kí tự').matches(/^[a-z\s] +^[0-9\s] + ^[_\s]$/, "Number amphabet gạch chân "),
  nickname: yup.string().required("Nickname bắt buộc nhập"),
}).required();

function ResgiterPage() {
  const form = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const navigate = useNavigate();

  function onSubmit(data) {
    dispatch(Resgiter(data)).then((res) => {
      if (res.payload.ok) {
        navigate('/');
      } else {
        // Handle registration failure
      }
    });
  }

  return (
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Register</h1>
            <div>
              {Object.values(errors).length > 0 && (
                Object.values(errors).map((item, index) => (
                  <p key={index}>{item.message}</p>
                ))
              )}
            </div>
            <div className="form-login-register">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <Input
                    label="Email"
                    type="text"
                    placeholder="Enter Email ..."
                    register={{ ...register('email') }}
                  />
                </div>
                <div className="form-control">
                  <Input
                    label="Username"
                    type="text"
                    placeholder="Username ..."
                    register={{ ...register('username') }}
                  />
                </div>
                <div className="form-control">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Password ..."
                    register={{ ...register('password') }}
                  />
                </div>
                <div className="form-control">
                  <Input
                    label="Nickname"
                    type="text"
                    placeholder="Enter Nickname ..."
                    register={{ ...register('nickname') }}
                  />
                </div>
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button htmlType="submit" size="large" type="primary" >
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
  );
}

export default ResgiterPage;
