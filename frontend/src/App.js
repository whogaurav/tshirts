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
  console.log(props);
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
        <div style={{ position: "relative", height: "235px" }}>
          <input
            type="text"
            className="passion-input"
            placeholder="Quelle est ta vraie passion ?"
            onChange={props.filterList}
            value={props.inputValue}
          />
          <div
            style={{ overflow: "scroll", position: "absolute", left: "86px" }}
          >
            {props.inputValue && (
              <ul>
                {props.passions.map((value, key) => (
                  <li
                    onClick={() => props.onClickList(value)}
                    key={value + key}
                  >
                    {value.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Link to="/screen4">
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
            marginTop: "1%",
            marginBottom: "3%"
          }}
        >
          <img
            src="/images/S.png"
            alt="S"
            style={{
              width: "20%",
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
              width: "25%",
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
    if (this.props.passion.id) {
      try {
        fetch(`${BASE_URL}/api/tshirts`, {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            size: "N/A",
            id: this.props.passion.id
          })
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              alert("Not connected to internet");
            }
          })
          .then(res => console.log(res));
      } catch {
        alert("Not connected to internet");
      }
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
    size: "S",
    passion: {},
    inputValue: "",
    passions: passions
  };

  filterList = event => {
    this.setState({ inputValue: event.target.value });
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
    //console.log(passion);
    this.setState({ passion: passion, inputValue: passion.name });
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
              inputValue={this.state.inputValue}
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
  },
  {
    name: "SUCCESS",
    id: 10
  },
  {
    name: "SEXINESS",
    id: 11
  },
  {
    name: "BRILLIANCE",
    id: 12
  },
  {
    name: "ENERGY",
    id: 13
  },
  {
    name: "INGENUITY",
    id: 14
  },
  {
    name: "HUMOUR",
    id: 15
  },
  {
    name: "OPTIMISIM",
    id: 16
  },
  {
    name: "CONFIDENCE",
    id: 17
  },
  {
    name: "CREATIVITY",
    id: 19
  },
  {
    name: "GENUINENESS",
    id: 20
  },
  {
    name: "ADVENTURE",
    id: 21
  },
  {
    name: "INDEPENDENCE",
    id: 22
  },
  {
    name: "GENEROSITY",
    id: 23
  },
  {
    name: "ART",
    id: 24
  },
  {
    name: "CHARM",
    id: 25
  },
  {
    name: "AWESOMENESS",
    id: 26
  },
  {
    name: "AMBITION",
    id: 27
  },
  {
    name: "OPEN-MINDEDNESS",
    id: 28
  },
  {
    name: "ORIGINALITY",
    id: 29
  },
  {
    name: "LEADERSHIP",
    id: 30
  },
  {
    name: "BEING A WORRIOR",
    id: 31
  },
  {
    name: "POPULARITY",
    id: 32
  },
  {
    name: "DANCE",
    id: 33
  },
  {
    name: "FABULOUSNESS",
    id: 34
  },
  {
    name: "AUTHENTICITY",
    id: 35
  },
  {
    name: "LOVE",
    id: 36
  },
  {
    name: "BRAVERY",
    id: 37
  },
  {
    name: "DREAM",
    id: 38
  },
  {
    name: "GLORY",
    id: 39
  },
  {
    name: "COOL",
    id: 40
  },
  {
    name: "STYLE",
    id: 41
  },
  {
    name: "ZINE",
    id: 42
  },
  {
    name: "LW3ORIYA",
    id: 43
  },
  {
    name: "T’BOGUISSA",
    id: 44
  },
  {
    name: "SPONTANEITY",
    id: 45
  },
  {
    name: "TALENT",
    id: 46
  },
  {
    name: "BEING THE BOSS",
    id: 47
  },

  {
    name: "BEING UNPAIRED",
    id: 48
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
              {v.id && <td>{v.id}</td>}
              {v.size && <td>{v.size}</td>}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
