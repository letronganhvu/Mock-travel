import React from "react";


import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import UserApi from "../../api/UserApi";
import { useState } from "react";
import { withRouter } from "react-router";

const SignUp = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");

  const [isDisabledResend, setDisabledResend] = useState(false);

  const resendEmailToActiveAccount = async () => {
    setDisabledResend(true);
     await UserApi.resendEmailToActiveAccount(email);
     setDisabledResend(false);
             
  }

  const redirectToLogIn = () => {
    props.history.push("/auth/sign-in")
  }
  return(
  <React.Fragment>
    <div className="text-center mt-4">
      <h1 className="h2">Get started</h1>
      <p className="lead">
        Start creating account in VTI Academy.
      </p>
    </div>

    <Formik
      initialValues={
        {
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
      validationSchema={
        Yup.object({
          firstName: Yup.string()
            .max(50, 'Must be less than 50 characters')
            .required('Required'),
          lastName: Yup.string()
            .max(50, 'Must be less than 50 characters')
            .required('Required'),
          userName: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required')
            .test('checkExistsUserName', 'This username is already registered.', async userName => {
              // call api
              const isExists = await UserApi.existsByUserName(userName);
              return !isExists;
            }),

          email: Yup.string()
            .email('Invalid email address')
            .required('Required')
            .test('checkExistsEmail', 'This email is already registered.', async email => {
              // call api
              const isExists = await UserApi.existsByEmail(email);
              return !isExists;
            }),
          password: Yup.string()
            .min(6, 'Must be between 6 and 50 characters')
            .max(50, 'Must be between 6 and 50 characters')
            .required('Required'),
          confirmPassword: Yup.string()
            .required('Required')
            .when("password", {
              is: val => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Confirm password do not match"
              )
            })
        })
      }
      onSubmit={
        async (values) => {

          try {
            // call api
            await UserApi.create(
              values.firstName,
              values.lastName,
              values.userName,
              values.email,
              values.password
            );
            // message;
            setEmail(values.email);
            setOpenModal(true);

          } catch (error) {
            props.history.push("/auth/500")
          }
        }
      }
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Card>
          <CardBody>
            <div className="m-sm-4">
              <Form>
                <FormGroup>
                  <FastField
                    label="First Name"
                    type="text"
                    bsSize="lg"
                    name="firstName"
                    placeholder="Enter your first name"
                    component={ReactstrapInput}
                  />
                </FormGroup>
                <FormGroup>
                  <FastField
                    label="Last Name"
                    type="text"
                    bsSize="lg"
                    name="lastName"
                    placeholder="Enter your last name"
                    component={ReactstrapInput}
                  />
                </FormGroup>
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
                    label="Email"
                    type="email"
                    bsSize="lg"
                    name="email"
                    placeholder="Enter your email"
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
                </FormGroup>

                <FormGroup>
                  <FastField
                    label="Confirm Password"
                    type="password"
                    bsSize="lg"
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    component={ReactstrapInput}
                  />
                </FormGroup>
                <div className="text-center mt-3">
                  <Button type="submit" color="primary" size="lg" disabled={isSubmitting}>
                    Sign up
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
        You need to confirm your account
      </ModalHeader>
      <ModalBody className=" m-3">
        <p className="mb-0">
          We have sent an email to <b>{email}</b>.</p>
          <p className="mb-0"> Please check your email to activate account.</p>
        
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={isDisabledResend} onClick={resendEmailToActiveAccount}>
          Resend
        </Button>{" "}
        <Button color="primary" onClick={redirectToLogIn}>
          Log In
        </Button>
      </ModalFooter>
    </Modal>
  </React.Fragment>
)};

export default withRouter(SignUp);
