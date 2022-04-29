import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../utils/contextState";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import Account from "../pages/Account";
import Admin from "../pages/accountNested/Admin";
import Returned from "../pages/accountNested/Returned";
import Rented from "../pages/accountNested/Rented";
import Bought from "../pages/accountNested/Bought";
import Basket from "../pages/Basket";
import Contact from "../pages/Contact";
import Footer from "./visualSection/Footer";
import Home from "../pages/Home";
import LogoBrowser from "./LogoBrowser";
import Results from "../pages/Results";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import TopNav from "./TopNav";
import YourAccount from "../pages/accountNested/YourAccount";

function App() {
  const [basketBuy, setBasketBuy] = useState([]);
  const [basketRent, setBasketRent] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState(false);
  const [modalBook, setModalBook] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  const { dataUser, setDataUser } = useContext(AppContext);

  const myKeyGoogleApi = "AIzaSyDUkLYsyGzoEavreh4lSYASKp8M6lj4B3E";

  const handleFetch = (input) => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&key=${myKeyGoogleApi}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((res) => {
        if (res.totalItems >= 1) {
          setResults(res.items);
        } else {
          throw new Error(res.Response);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  //update dataUser
  function updateDataUser() {
    let url = window.location.href;
    if (currentURL !== url && dataUser.logged) {
      let _id = dataUser.data._id;
      console.log(_id);
      fetch(`http://localhost:3001/api/account/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          let user = res;
          setDataUser({ logged: true, data: user });
          setCurrentURL(url);
          console.log("url changed, updated dataUser");
        })
        .catch((err) => {
          alert(err);
          console.log("Error Reading data " + err);
        });
    }
  }

  return (
    <div className="wrapper">
      {updateDataUser()}
      <TopNav
        setDataUser={setDataUser}
        dataUser={dataUser}
        handleFetch={handleFetch}
        setInput={setInput}
        input={input}
        setBasketRent={setBasketRent}
        setBasketBuy={setBasketBuy}
      />
      <LogoBrowser
        input={input}
        setInput={setInput}
        handleFetch={handleFetch}
      />
      <div id="routesInApp">
        <Routes>
          <Route path="/" element={<Home dataUser={dataUser} />} />
          <Route
            path="/shop"
            element={
              <Shop
                setModalBook={setModalBook}
                modalBook={modalBook}
                setBasketBuy={setBasketBuy}
                setBasketRent={setBasketRent}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/basket"
            element={
              <Basket
                dataUser={dataUser}
                basketBuy={basketBuy}
                setBasketBuy={setBasketBuy}
                basketRent={basketRent}
                setBasketRent={setBasketRent}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<SignUp dataUser={dataUser} setDataUser={setDataUser} />}
          />
          <Route
            path="/results"
            element={
              <Results
                input={input}
                setResults={setResults}
                results={results}
                setBasketBuy={setBasketBuy}
                setBasketRent={setBasketRent}
                modalBook={modalBook}
                setModalBook={setModalBook}
              />
            }
          />
          <Route
            path="/account"
            element={<Account dataUser={dataUser} setDataUser={setDataUser} />}
          >
            <Route index exact element={<YourAccount dataUser={dataUser} />} />
            <Route path="rented" element={<Rented dataUser={dataUser} />} />
            <Route path="returned" element={<Returned dataUser={dataUser} />} />
            <Route path="bought" element={<Bought dataUser={dataUser} />} />
            <Route path="admin" element={<Admin dataUser={dataUser} />}>
              <Route path="users" element={<Admin />} />
              <Route path="admins" element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
