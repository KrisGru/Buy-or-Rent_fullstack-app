import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "./utils/boxOfStates";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import Account from "./pages/Account";
import Admin from "./pages/accountNested/Admin";
import Returned from "./pages/accountNested/Returned";
import Rented from "./pages/accountNested/Rented";
import Bought from "./pages/accountNested/Bought";
import Basket from "./pages/Basket";
import Contact from "./pages/Contact";
import Footer from "./components/visualSection/Footer";
import Home from "./pages/Home";
import LogoBrowser from "./components/LogoBrowser";
import Results from "./pages/Results";
import Shop from "./pages/Shop";
import SignUp from "./pages/SignUp";
import TopNav from "./components/TopNav";
import YourAccount from "./pages/accountNested/YourAccount";

export default function App() {
  const [currentURL, setCurrentURL] = useState("");
  // global states
  const { dataUser, setDataUser, setResults } = useContext(AppContext);

  const myKeyGoogleApi = "AIzaSyDUkLYsyGzoEavreh4lSYASKp8M6lj4B3E";

  const bookFetch = (input) => {
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
      <TopNav bookFetch={bookFetch} />
      <LogoBrowser bookFetch={bookFetch} />
      <div id="routesInApp">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/results" element={<Results />} />
          <Route path="/account" element={<Account />}>
            <Route index exact element={<YourAccount />} />
            <Route path="rented" element={<Rented />} />
            <Route path="returned" element={<Returned />} />
            <Route path="bought" element={<Bought />} />
            <Route path="admin" element={<Admin />}>
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
