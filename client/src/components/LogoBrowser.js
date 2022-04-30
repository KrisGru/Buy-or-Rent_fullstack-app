import { Link } from "react-router-dom";
import { AppContext } from "../utils/contextState";
import { useContext } from "react";

export default function LogoBrowser({ handleFetch }) {
  return (
    <div>
      <Logo />
      <Browser handleFetch={handleFetch} />
    </div>
  );
}

//Logo
function Logo() {
  return (
    <section
      className="bgLogo"
      style={{ backgroundImage: `url("/assets/bgLogo.jpg")` }}
    >
      <div
        className="logo"
        onClick={() => window.location.replace("http://localhost:3000/")}
      >
        <img id="logo-underBrowser" src="/assets/logo.png" alt="logo" />
      </div>
    </section>
  );
}

//Browser
function Browser({ handleFetch }) {
  const { setInput, input } = useContext(AppContext);

  return (
    <section className="bgBrowser">
      <div className="browser">
        <h1>Search Books</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleFetch(input);
            }
          }}
          placeholder="search title"
        />
        <Link
          onClick={() => handleFetch(input)}
          type="button"
          to="./results"
          className="button lightBtn"
        >
          Search
        </Link>
      </div>
    </section>
  );
}
