import React from "react";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Card,
    CardBody,
    Row,
    Col
} from "reactstrap";
import { selectMaxTotalMember, selectMinTotalMember } from "../../redux/selectors/GroupSelector";
import { connect } from "react-redux";

const CustomFilter = (props) => {
    return (
        <Formik
            key={Date.parse(new Date())}
            enableReinitialize
            initialValues={
                {
                    minTotalMember: props.minTotalMember ? props.minTotalMember : '',
                    maxTotalMember: props.maxTotalMember ? props.maxTotalMember : '',
                }
            }
            validationSchema={
                Yup.object({
                    minTotalMember: Yup.number()
                        .positive('Must be greater than 0 and interger')
                        .integer('Must be greater than 0 and interger'),
                    maxTotalMember: Yup.number()
                        .positive('Must be greater than 0 and interger')
                        .integer('Must be greater than 0 and interger')
                })
            }
            onSubmit={
                values => {
                    props.handleChangeFilter(values.minTotalMember, values.maxTotalMember);
                }
            }
            validateOnBlur={true}
            validateOnChange={true}

        >
            <Card>
                <CardBody>

                    <Form>
                        <fieldset className="filter-border">
                            <legend className="filter-border">Filter</legend>
                            <Row >
                                <Col lg="auto">
                                    <label>Total Member:</label>
                                </Col>
                                <Col lg="2">
                                    <FastField
                                        style={{ display: "initial" }}
                                        type="number"
                                        bsSize="lg"
                                        name="minTotalMember"
                                        placeholder="Min"
                                        component={ReactstrapInput}
                                    />
                                </Col>
                                {"-"}
                                <Col lg="2">
                                    <FastField
                                        style={{ display: "initial" }}
                                        type="number"
                                        bsSize="lg"
                                        name="maxTotalMember"
                                        placeholder="Max"
                                        component={ReactstrapInput}
                                    />
                                </Col>
                                <Col lg="auto">
                                    <Button type="submit" color="primary" size="lg"  >
                                        Filter
                                    </Button>
                                </Col>
                            </Row>

                        </fieldset>
                    </Form>

                </CardBody>
            </Card>

        </Formik>

    );
}

const mapGlobalStateToProps = (state) => {
    return {

        minTotalMember: selectMinTotalMember(state),
        maxTotalMember: selectMaxTotalMember(state),

    }
};

export default connect(mapGlobalStateToProps)(CustomFilter);