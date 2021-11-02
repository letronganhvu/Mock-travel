import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,

} from "reactstrap";

import unsplash3 from "../../assets/img/photos/unsplash-3.jpg";
import TourApi from "../../api/TourApi"
import { selectTours } from "../../redux/selectors/TourSelector";
import { connect } from "react-redux";
import {getListTourAction} from "../../redux/actions/tourAction"
const Card2 = (props) => {
  

  useEffect(() =>{
    const getTour = async () => {
    const result = await TourApi.tour();
    const tours = result;
    console.log(result);
    props.getListTourAction(tours)
   
    }
    getTour();
  }, [])
  return(
  <Card>
  <CardImg top width="100%" src={unsplash3} alt="Card image cap" />
  <CardHeader>
    <CardTitle tag="h5" className="mb-0">
      Card with image and list
    </CardTitle>
  </CardHeader>
  <ListGroup flush>
    <ListGroupItem>{props.getListTourAction.id}</ListGroupItem>
    <ListGroupItem>{props.getListTourAction.name}</ListGroupItem>
    <ListGroupItem>Vestibulum at eros</ListGroupItem>
  </ListGroup>
</Card>
)}
const mapGlobalStateToProps = (state) => {
    return {
  
      tours: selectTours(state),
  
    }
  }; 
  
  export default connect(mapGlobalStateToProps, { getListTourAction})(Card2) ;