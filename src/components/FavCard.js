import React, { Component } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
export class FavCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  removeFav = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER}/removeFav/${this.props.index}?email=${this.props.auth0.user.email}`
      )
      .then((resultData) => {
        this.props.getFavData();
      });
  };

  updateFav = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_SERVER}/updateFav/${this.props.index}?email=${this.props.auth0.user.email}`,
        {
          strDrink: e.target.strDrink.value,
          strDrinkThumb: e.target.strDrinkThumb.value,
          idDrink: e.target.idDrink.value,
        }
      )
      .then((resultData) => {
        this.props.getFavData();
        this.handleClose();
      });
  };

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.updateFav}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Drink Name</Form.Label>
                <Form.Control
                  name="strDrink"
                  type="text"
                  defaultValue={this.props.drink.strDrink}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Drink img</Form.Label>
                <Form.Control
                  type="text"
                  name="strDrinkThumb"
                  defaultValue={this.props.drink.strDrinkThumb}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Drink id</Form.Label>
                <Form.Control
                  type="text"
                  name="idDrink"
                  defaultValue={this.props.drink.idDrink}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={this.props.drink.strDrinkThumb}
            alt={this.props.drink.idDrink}
          />
          <Card.Body>
            <Card.Title>{this.props.drink.strDrink}</Card.Title>
            <Card.Text>ID : {this.props.drink.idDrink}</Card.Text>
            <Button onClick={this.removeFav} variant="danger">
              Remove
            </Button>

            <Button onClick={this.handleShow} variant="info">
              Update
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withAuth0(FavCard);
