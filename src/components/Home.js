import React, { Component } from "react";
import axios from "axios";
import HomeCards from "./HomeCards";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drinks: null,
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER}/drinks`).then((resultData) => {
      this.setState({
        drinks: resultData.data.map((d) => {
          return <HomeCards drink={d} />;
        }),
      });
    });
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

export default Home;
