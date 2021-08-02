import axios from "axios";
import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import FavCard from "./FavCard";

export class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drinks: null,
    };
  }

  getFavData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/getToFav?email=${this.props.auth0.user.email}`
      )
      .then((resultData) => {
        this.setState({
          drinks: resultData.data.map((element, index) => {
            return (
              <FavCard
                getFavData={this.getFavData}
                index={index}
                drink={element}
              />
            );
          }),
        });
      });
  };

  componentDidMount() {
    this.getFavData();
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {this.state.drinks}
      </div>
    );
  }
}

export default withAuth0(Favorite);
