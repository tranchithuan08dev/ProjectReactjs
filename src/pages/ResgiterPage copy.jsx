import '../pages/LoginPage/login.css'
import Input from "../components/shared/Input"
import Button from '../components/shared/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Resgiter } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
function ResgiterPage() {
  const dispatch = useDispatch();
  const [formErrorr, setFormErrorr] = useState("")
  const [formdata, setFormdat] = useState({
    email: 'test08@gmail.com',
    username: 'Test08',
    password: '08082004',
    nickname: 'test08',
  })
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(Resgiter(formdata)).then((res) => {
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
            <h1 className="form-title text-center">Resgiter</h1>
            <p>{formErrorr}</p>
            <div className="form-login-register">
              <form onSubmit={handleSubmit} >
                <div className="form-control">
                  <Input
                    name='email'
                    value={formdata.email}
                    onChange={handleChange}
                    label="Email" type="text" placeholder="Enter Email ..." />
                </div>
                <div className="form-control">
                  <Input
                    name='username'
                    value={formdata.username}
                    onChange={handleChange}
                    label="Username" type="text" placeholder="Eamil Username ..." />
                </div>
                <div className="form-control">
                  <Input
                    name='password'
                    value={formdata.password}
                    onChange={handleChange}
                    label="Password" type="password" placeholder="Password Username ..." />
                </div>
                <div className="form-control">
                  <Input
                    onChange={handleChange}
                    name='nickname'
                    value={formdata.nickname}
                    label="Nickname" type="text" placeholder="Enter Nickname ..." />

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

export default ResgiterPage;
