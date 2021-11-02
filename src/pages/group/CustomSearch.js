import React from "react";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik } from "formik";
import { connect } from "react-redux";
import {
    Button,
    InputGroupAddon,
    Row,
    Col

} from "reactstrap";
import { selectSearch } from "../../redux/selectors/GroupSelector";

const CustomSearch = (props) => {


    return (
        <Formik
            key={Date.parse(new Date())}
            enableReinitialize
            initialValues={
                {
                    search: props.search ? props.search : '',
                }
            }

            onSubmit={
                values => {
                    props.onSearch(values.search);
                }
            }

        >
            <Form>
                <Row  >
                    <Col className="col" >
                        <FastField
                            style={{ display: 'initial' }}
                            type="text"
                            bsSize="lg"
                            name="search"
                            placeholder="Search for..."
                            component={ReactstrapInput}
                        />
                    </Col>

                    <Col className="col-auto">
                        
                        <InputGroupAddon addonType="append" color="primary" className="s-cover">
                            <Button type="submit" className="button">
                            <div className="s-circle"></div>
                            <span></span>
                            </Button>
                        </InputGroupAddon>
                        
                    </Col>
                </Row>
            </Form>
        </Formik>
    );
}

const mapGlobalStateToProps = (state) => {
    return {

        search: selectSearch(state),
    }
};

export default connect(mapGlobalStateToProps)(CustomSearch);
