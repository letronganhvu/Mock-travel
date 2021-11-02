import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  CustomInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import LoginApi from "../../api/LoginApi";
import { withRouter } from "react-router";

import storage from "../../storage/Storage";
import { toastr } from "react-redux-toastr";
import { useState } from "react/cjs/react.development";
import userApi from "../../api/UserApi";
import {setUserLoginInfo, setTokenInfo} from "../../redux/actions/userLoginInfoActions";
import { connect } from "react-redux";



const SignIn = (props) => {
  
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const [isDisabledResend, setDisabledResend] = useState(false);

  //remember me
  const [checkedRememberMe, setCheckedRememberMe] = useState(storage.isRemenberMe());

  const resendEmailToActiveAccount = async () => {
    setDisabledResend(true);
     await userApi.resendEmailToActiveAccount(email);
     setDisabledResend(false);
             
  }

  const showNotification = (title,message) => {
    const options = {
      timeOut: 5000,
      showCloseButton: false,
      progressBar: true,
      position: "top-right"
  }
  toastr.error(title,message, options);
}
  
  
  return(
  <React.Fragment>
    <div className="text-center mt-4">
      <h2>Welcome to VTI Academy</h2>
      <p className="lead">Sign in to your account to continue</p>
    </div>
    <Formik
      initialValues={
        {
          userName: '',
          password: '',
        }
      }
      validationSchema={
        Yup.object({
          userName: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required'),
        })
      }
      onSubmit={
        async (values) => {

          try {
            // call api
            const result = await LoginApi.login(
              values.userName,
              values.password

            );

            //check user active
            if( result.token === null || result.token === undefined){
              setEmail(result.email);
              setOpenModal(true);
            }else{

              //set rememberme
              storage.setRemenberMe(checkedRememberMe);

               //save token & userInfo to storage
              storage.setToken(result.token);
              storage.setUserInfo(
                result.userName,
                result.email,
                result.firstName,
                result.lastName,
                result.role,
                result.status
                );
                //save token & userInfo to redux
                props.setTokenInfo(result.token)
                props.setUserLoginInfo(
                result.userName,
                result.email,
                result.firstName,
                result.lastName,
                result.role,
                result.status
                );

                //redirect to home page
                props.history.push("/dashboard/default")
            }
          } catch (error) {
              if(error.status === 401){
                showNotification("Login Fail!", "Wrong Username or Password");
              }else
            props.history.push("/auth/500")
          }
        }
      }

    >
      {({ isSubmitting }) => (
        <Card>
          <CardBody>
            <div className="m-sm-4">
              <div className="text-center">
                <img
                  src="https://vtiacademy.edu.vn/upload/images/z2485665676985-0739477a4b6f16e00ff5b4cdaa14b63a.jpg"
                  alt="VTI Academy"
                  className="img-fluid rounded-circle"
                  width="132"
                  height="132"
                />
              </div>
              <Form>
                <FormGroup>
                  <FastField
                    label="User Name"
                    type="text"
                    bsSize="lg"
                    name="userName"
                    placeholder="Enter your user name"
                    component={ReactstrapInput}
                  />
                </FormGroup>
                <FormGroup>
                  <FastField
                    label="Password"
                    type="password"
                    bsSize="lg"
                    name="password"
                    placeholder="Enter password"
                    component={ReactstrapInput}
                  />

                  <small>
                    <Link to="/auth/reset-password">Forgot password?</Link>
                  </small>
                </FormGroup>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="rememberMe"
                    label="Remember me next time"
                    defaultChecked= {checkedRememberMe}
                    onChange={() => setCheckedRememberMe(!checkedRememberMe)}
                  />
                </div>
                <div className="text-center mt-3">
                  <Button type="submit" color="primary" size="lg" disabled={isSubmitting} >
                    Sign in
                  </Button>
                </div>
              </Form>
            </div>
          </CardBody>
        </Card>
      )}
    </Formik>

    <Modal isOpen={isOpenModal}>
      <ModalHeader >
        You need to active your account
      </ModalHeader>
      <ModalBody className=" m-3">
        <p className="mb-0">
          Your account is not active .</p>
          <p className="mb-0"> Please check your email <b>{email}</b> to activate account.</p>
        
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={isDisabledResend} onClick={resendEmailToActiveAccount}>
          Resend
        </Button>{" "}
        <Button color="primary" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  </React.Fragment>
)};

export default connect(null, { setUserLoginInfo, setTokenInfo })(withRouter(SignIn));
