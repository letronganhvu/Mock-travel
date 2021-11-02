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
import {getListTourAction} from "../../redux/actions/tourAction";
import Card2 from "./Card2"
// const Card2 = (props) => {
//   const [tourInfo, setTourInfo] = useState({});

//   useEffect(() =>{
//     const getTour = async () => {
//     const result = await TourApi.tour();
//     const tours = result;
//     console.log(result);
//     props.getListTourAction(tours)
//     setTourInfo(result);
//     }
//     getTour();
//   }, [])
//   return(
//   <Card>
//   <CardImg top width="100%" src={unsplash3} alt="Card image cap" />
//   <CardHeader>
//     <CardTitle tag="h5" className="mb-0">
//       Card with image and list
//     </CardTitle>
//   </CardHeader>
//   <ListGroup flush>
//     <ListGroupItem>{tourInfo.id}</ListGroupItem>
//     <ListGroupItem>{tourInfo.name}</ListGroupItem>
//     <ListGroupItem>Vestibulum at eros</ListGroupItem>
//   </ListGroup>
// </Card>
// )}
const Tour = () => {
  
  return (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Tour Page</h1>

    <Row>
      <Col md="6" lg="3">
      <Card2/>
 
      </Col>

      <Col md="6" lg="3">
      <Card2/>
      </Col>

    



    </Row>
  </Container>
)};

// const mapGlobalStateToProps = (state) => {
//   return {

//     tours: selectTours(state),

//   }
// }; 

export default Tour ;
