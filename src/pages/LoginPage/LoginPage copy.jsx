import './login.css'
import Input from "../../components/shared/Input"
import Button from '../../components/shared/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const dispatch = useDispatch();
  const [formErrorr, setFormErrorr] = useState("")
  const [formdata, setFormdat] = useState({
    username: 'admin',
    password: '123123',
  })
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Login(formdata)).then((res) => {
      if (res.payload.ok) {
        navigate('/');
      } else {
        setFormErrorr(res.payload.message)
      }
    })
  }
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormdat({
      ...formdata,
      [name]: value
    })
  }
  return <>
    <main className="login">
      <div className="spacing" />
      <div className="tcl-container">
        <div className="tcl-row">
          <div className="tcl-col-12 tcl-col-sm-6 block-center">
            <h1 className="form-title text-center">Login</h1>
            <p>{formErrorr}</p>
            <div className="form-login-register">
              <form onSubmit={handleSubmit} >
                <div className="form-control">
                  <Input
                    name='username'
                    value={formdata.username}
                    onChange={handleChange}
                    label="Username" type="text" placeholder="Enter Username ..." />
                </div>
                <div className="form-control">
                  <Input
                    onChange={handleChange}
                    name='password'
                    value={formdata.password}
                    label="Password" type="password" placeholder="Enter Password ..." />

                </div>
                <div className="d-flex tcl-jc-between tcl-ais-center">
                  <Button htmlType="submit" size="large" type="primary" >Submit</Button>
                  <a href="register.html">Regiter</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="spacing" />
    </main>

  </>;
}

export default LoginPage;
