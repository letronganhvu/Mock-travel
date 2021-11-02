import React from "react";


import {
  Button,
  Card,
  CardBody,
  FormGroup,


} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import UserApi from "../../api/UserApi";
import { useParams } from "react-router";
import { toastr } from "react-redux-toastr";
// import { withRouter } from "react-router";

const NewPassword = (props) => {

  const { token } = useParams();
  

  if(!token){
    props.history.push("/auth/404")
  }

  const showNotification = (title,message) => {
    const options = {
      timeOut: 5000,
      showCloseButton: false,
      progressBar: true,
      position: "top-right"
  }

  toastr.success( title,message, options);
}

  const redirectToLogIn = () => {
    props.history.push("/auth/sign-in")
  }
  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h1 className="h2">Reset password</h1>
        <p className="lead">Enter your new password.</p>
      </div>

      <Formik
        initialValues={
          {
            password: '',
            confirmPassword: ''
          }
        }
        validationSchema={
          Yup.object({
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
            }),
          })
        }
        onSubmit={
          async (values) => {

            try {
              // call api
              await UserApi.resetPassword(
                token,
                values.password 

              );
              // message;
              
              showNotification("Reset Password", "Reset Password Successfully!");
              redirectToLogIn();
            } catch (error) {
              props.history.push("/auth/500")
            }
          }
        }

      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="Password"
                      type="password"
                      bsSize="lg"
                      name="password"
                      placeholder="Enter new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Confirm Password"
                      type="password"
                      bsSize="lg"
                      name="confirmPassword"
                      placeholder="Enter confirm new password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <div className="text-center mt-3">

                    <Button type="submit" color="primary" size="lg" disabled={isSubmitting}>
                      Reset password
                    </Button>

                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </React.Fragment>
  )
};

export default NewPassword;
