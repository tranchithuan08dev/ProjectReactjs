// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { useDispatch } from 'react-redux';
import { fetchChangePassWord } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';


function ChangePassPage() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });
    const navigate = useNavigate()
    //12345678
    //123123
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.currentPassword !== formData.newPassword && formData.newPassword == formData.confirmNewPassword) {
            dispatch(fetchChangePassWord({ password: formData.currentPassword, new_password: formData.newPassword, confirm_new_password: formData.confirmNewPassword })).then(navigate('/'))
        } else {
            alert("Thông tin bạn không đúng")
        }
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });
    }


    return (
        <>
            <main className="login">
                <div className="spacing" />
                <div className="tcl-container">
                    <div className="tcl-row">
                        <div className="tcl-col-12 tcl-col-sm-6 block-center">
                            <h1 className="form-title text-center">ChangePassWord</h1>
                            <div className="form-login-register">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <Input
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            label="Current Password"
                                            type="password"
                                            placeholder="Enter Current Password ..."
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <Input
                                            name="newPassword"
                                            value={formData.newPassword}
                                            label="New Password"
                                            type="password"
                                            placeholder="Enter New Password ..."
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <div className="form-control">
                                        <Input
                                            name="confirmNewPassword"
                                            value={formData.confirmNewPassword}
                                            label="Confirm new Password"
                                            type="password"
                                            placeholder="Enter Confirm new Password ..."
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <div className="d-flex tcl-jc-between tcl-ais-center ">
                                        <Button htmlType="submit" size="large" type="primary">
                                            Submit
                                        </Button>

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
export default ChangePassPage;
