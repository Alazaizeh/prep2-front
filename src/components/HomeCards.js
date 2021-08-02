import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
export class HomeCards extends Component {
  addToFav = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/addToFav?email=${this.props.auth0.user.email}`,
        this.props.drink
      )
      .then((resultData) => {});
  };

  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={this.props.drink.strDrinkThumb}
            alt={this.props.drink.idDrink}
          />
          <Card.Body>
            <Card.Title>{this.props.drink.strDrink}</Card.Title>
            <Card.Text>ID : {this.props.drink.idDrink}</Card.Text>
            <Button onClick={this.addToFav} variant="primary">
              Add to Favorite
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withAuth0(HomeCards);
