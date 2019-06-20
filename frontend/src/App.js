import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { BASE_URL } from "./config";

class Screen1 extends Component {
  componentDidMount() {
    this.props.reset();
  }

  render() {
    return (
      <Layout>
        <div className="screen-container">
          <img class="brand-image" src="/images/marlboro.png" />
          <h1>APPUiE ICI et porte </h1>
          <h1>ta vaie passion</h1>
          <Link to="/screen2">
            <button className="btn">COMMENCER</button>
          </Link>
        </div>
      </Layout>
    );
  }
}

function Screen2(props) {
  return (
    <Layout>
      <div className="screen-container">
        {/* <img
          class="brand-image"
          src="/images/marlboro.png"
          style={{ marginBottom: "20px" }}
        /> */}
        <h1 style={{ marginTop: "8%", marginBottom: "10%" }}>
          Quelle est ta vraie passion ?
        </h1>
        <div style={{ position: "relative", height: "200px" }}>
          <input
            type="text"
            className="passion-input"
            placeholder="Quelle est ta vraie passion ?"
            onChange={props.filterList}
            value={
              props.passion && props.passion.name
                ? props.passion.id + ". " + props.passion.name
                : ""
            }
          />
          <div
            style={{ overflow: "scroll", position: "absolute", left: "86px" }}
          >
            <ul>
              {props.passions.map((value, key) => (
                <li onClick={() => props.onClickList(value)} key={value + key}>
                  {value.id}. {value.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/screen3">
          <button className="btn" style={{ marginTop: "80px" }}>
            SUIVANT
          </button>
        </Link>
      </div>
    </Layout>
  );
}

function Screen3(props) {
  return (
    <Layout>
      <div className="screen-container">
        <h1 style={{ marginTop: "20px" }}>
          Quelle est la taille de ton T-shirt ?
        </h1>
        <div
          style={{
            flexDirection: "row",
            marginTop: "5%",
            marginBottom: "5%"
          }}
        >
          <img
            src="/images/S.png"
            alt="S"
            style={{
              width: "30%",
              border:
                props.size === "S"
                  ? "thin solid #FFF"
                  : "thin solid transparent"
            }}
            onClick={() => props.chooseSize("S")}
          />
          <img
            src="/images/M.png"
            alt="M"
            style={{
              width: "30%",
              border:
                props.size === "M"
                  ? "thin solid #FFF"
                  : "thin solid transparent"
            }}
            onClick={() => props.chooseSize("M")}
          />
          <img
            src="/images/L.png"
            alt="L"
            style={{
              width: "30%",
              border:
                props.size === "L"
                  ? "thin solid #FFF"
                  : "thin solid transparent"
            }}
            onClick={() => props.chooseSize("L")}
          />
        </div>
        <Link to="/screen4">
          <button className="btn" style={{ marginTop: "0" }}>
            SUIVANT
          </button>
        </Link>
      </div>
    </Layout>
  );
}

class Screen4 extends Component {
  state = {
    error: null
  };
  componentDidMount() {
    if (this.props.passion.id && this.props.size) {
      fetch(`${BASE_URL}/api/tshirts`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          size: this.props.size,
          id: this.props.passion.id
        })
      })
        .then(res => res.json())
        .then(res => console.log(res));
    } else {
      this.setState({
        error: "Error! Not submitted  - please go back and fill all the details"
      });
    }
  }
  render() {
    return (
      <Layout>
        <h1 style={{ marginBottom: "10%", fontSize: "6rem" }}>Merci !</h1>
        <h1>Ton T-shirt sera disponible</h1>
        <h1>au desk d’accuiel</h1>
        <br />
        <br />
        <h2>Passion: {this.props.passion.name}</h2>
        <br />
        <h2>Size: {this.props.size}</h2>

        <h3>{this.state.error && this.state.error}</h3>
        <Link to="/">
          <button className="btn" style={{ marginTop: "0" }}>
            Start Over
          </button>
        </Link>
      </Layout>
    );
  }
}

function Screen5() {
  return (
    <Layout>
      <h1>APPUiE ICI et porte </h1>
    </Layout>
  );
}

export default class App extends Component {
  state = {
    size: "",
    passion: {},
    inputValue: "",
    passions: passions
  };

  filterList = event => {
    let updatedList = passions;
    updatedList = updatedList.filter(function(item) {
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ passions: updatedList });
  };

  chooseSize = size => {
    this.setState({ size: size });
  };
  onInputChange = inputValue => {
    this.setState({ inputValue: inputValue });
  };
  onClickList = passion => {
    console.log(passion);
    this.setState({ passion: passion });
  };
  reset = () => {
    this.setState({
      size: "",
      passion: {},
      inputValue: "",
      passions: passions
    });
  };
  render() {
    return (
      <Router>
        <Route path="/" exact render={() => <Screen1 reset={this.reset} />} />
        <Route
          path="/screen2"
          exact
          render={() => (
            <Screen2
              filterList={this.filterList}
              passion={this.state.passion}
              onClickList={this.onClickList}
              onInputChange={this.onInputChange}
              passions={this.state.passions}
            />
          )}
        />
        <Route
          path="/screen3"
          exact
          render={() => (
            <Screen3 size={this.state.size} chooseSize={this.chooseSize} />
          )}
        />
        <Route
          path="/screen4"
          exact
          render={() => (
            <Screen4 size={this.state.size} passion={this.state.passion} />
          )}
        />
        <Route path="/screen5" exact render={() => <Screen5 />} />
        <Route path="/dash" exact render={() => <Dash />} />
      </Router>
    );
  }
}

const passions = [
  {
    name: "INTELLIGENCE",
    id: 1
  },
  {
    name: "BEAUTY",
    id: 2
  },
  {
    name: "UNIQUENESS",
    id: 3
  },
  {
    name: "STRENGTH",
    id: 4
  },
  {
    name: "POWER",
    id: 5
  },
  {
    name: "COURAGE",
    id: 6
  },
  {
    name: "WONDER",
    id: 7
  },
  {
    name: "HAPPINESS",
    id: 8
  },
  {
    name: "PERFECTION",
    id: 9
  }
];

class Dash extends Component {
  state = {
    tshirts: []
  };
  componentDidMount() {
    fetch(`${BASE_URL}/api/tshirts`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ tshirts: res });
      });
  }

  render() {
    return (
      <div>
        <table id="customers">
          <tr>
            <th>Date-Time</th>
            <th>ID</th>
            <th>Size</th>
          </tr>
          {this.state.tshirts.map((v, k) => (
            <tr>
              {v.date && <td>{v.date}</td>}
              {v.passion && <td>{v.passion}</td>}
              {v.size && <td>{v.size}</td>}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
