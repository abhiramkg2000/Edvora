import "./styles.css";
import UpcomingRides from "./components/UpcomingRides/UpcomingRides";
import PastRides from "./components/PastRides/PastRides";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./components/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/fontawesome-free-solid";
import { Switch, Link, BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [click, setClick] = useState(1);
  const [clicked, setClicked] = useState(true);

  //const [distance, setDistance] = useState([]);

  useEffect(() => {
    axios
      .get("https://assessment.api.vweb.app/rides")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://assessment.api.vweb.app/user")
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleChange1 = (e) => {
    //console.log(e.target.value);
    const selected = e.target.value;
    console.log(selected);
    //console.log("data= " + data);
    if (selected === "all") {
      setValue(data);
    } else {
      const filtered = data.map((item, index) => {
        if (selected === item.state) {
          return item.city;
        }
        return 0;
      }, selected);
      console.log("filtered= " + filtered);
      setSelected(filtered);

      const temp = data.map((item, index) => {
        if (selected === item.state) {
          return item;
        }
        return 0;
      });
      setValue(temp);
    }
  };

  //console.log("value1 " + value);

  const handleChange2 = (e) => {
    console.log(e.target.value);
    const selected = e.target.value;
    const temp = data.map((item, index) => {
      if (selected === item.city) {
        return item;
      }
      return 0;
    });
    setValue(temp);
  };

  data.map((item, index) => {
    let d = Math.max(...item.station_path) - userdata.station_code;
    for (let i = 0; i < item.station_path.length; i++) {
      if (
        item.station_path[i] >= userdata.station_code &&
        item.station_path[i] - userdata.station_code <= d
      ) {
        d = item.station_path[i] - userdata.station_code;
      }
      //console.log("loop working");
    }
    item.distance = d;
    return d;
    //console.log("d= ", d);
  });
  //console.log(calculate);
  //setDistance(calculate);
  //console.log("distance= " + distance);

  //console.log("value2 " + value);
  //let filtered = data.filter((item) => data.includes(item.city));
  data.sort((a, b) => {
    if (a.distance > b.distance) {
      return 1;
    } else if (a.distance < b.distance) {
      return -1;
    }
    return 0;
  });

  const handleClick = () => {
    console.log(click);
    if (click === 1) {
      setClick(2);
    } else {
      setClick(1);
    }
  };

  const handleClicked = (e) => {
    if (e === "NearbyRides") {
      setClicked(true);
    } else {
      setClicked(false);
    }
    console.log(clicked + " " + e);
  };
  return (
    <div className="App">
      <div className="menu">
        <div className="heading">
          <h1>Edvora</h1>
        </div>
        <div className="user">
          <p>{userdata.name}</p>
          <div className="user-image">
            <img
              src={userdata.url}
              alt="not found"
              height="100%"
              width="100%"
              className="image"
            />
          </div>
        </div>
      </div>

      <div className="filter-menu">
        <div className="filter-content">
          <Router>
            <Link
              to="/App"
              className="link"
              onClick={(e) => handleClicked("NearbyRides")}
            >
              Nearest rides
            </Link>
            <Link
              to={{
                pathname: "/UpcomingRides",
                state: clicked === true ? !clicked : clicked
              }}
              className="link"
              onClick={(e) => handleClicked("UpcomingRides")}
            >
              Upcoming rides
            </Link>
            <Link
              to={{
                pathname: "/PastRides",
                state: clicked === true ? !clicked : clicked
              }}
              className="link"
              onClick={(e) => handleClicked("PastRides")}
            >
              Past rides
            </Link>
            <Switch>
              <Route path="/Card" exact component={Card} />
              <Route path="/UpcomingRides" exact component={UpcomingRides} />
              <Route path="/PastRides" exact component={PastRides} />
            </Switch>
          </Router>
        </div>
        <div className={click !== 2 ? "filter active" : "filter"}>
          <div className="filter-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faFilter} color="white" size="lg" />
          </div>
          <div className="filter-drop">
            {click === 2 ? (
              <select onChange={handleChange1} className="dropdown1">
                <option>all</option>
                {data.map((item, index) => {
                  return <option key={index}>{item.state}</option>;
                })}
              </select>
            ) : null}
            {click === 2 ? (
              <select onChange={handleChange2} className="dropdown2">
                {selected.length !== 0
                  ? selected.map((item, index) => {
                      if (item !== 0)
                        return <option key={index}>{item}</option>;
                      return 0;
                    })
                  : data.map((item, index) => {
                      return <option key={index}>{item.city}</option>;
                    })}
              </select>
            ) : null}
          </div>
        </div>
      </div>
      {clicked
        ? value.length !== 0
          ? value.map((item, index) => {
              if (item !== 0)
                return <Card item={item} key={index} index={index} />;
              return <p key={index} />;
            })
          : data.map((item, index) => {
              return <Card item={item} key={index} index={index} />;
            })
        : null}
    </div>
  );
}
