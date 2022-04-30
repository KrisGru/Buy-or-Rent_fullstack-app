import BooksView from "../components/visualSection/BooksView";
// import Modal from "../components/visualSection/Modal";
import { AppContext } from "../utils/boxOfStates";
import { useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function Results() {
  const { input, results } = useContext(AppContext);

  const books = results;

  const createNotification = (type, text) => {
    switch (type) {
      case "success":
        NotificationManager.success(text, "Succes");
        break;
      default:
        NotificationManager.error(text, "Error", 1000);
    }
  };

  return (
    <>
      <h1 className="headerResults">Results</h1>
      <div className="descriptionIcons">
        <p>
          <MdShoppingCart className="forSale" size={28} />
          For Sale
        </p>
        <p>
          <MdRemoveShoppingCart className="notForSale" size={28} />
          Not For Sale
        </p>
        <p>
          <BsHourglassSplit className="forRent" size={28} />
          Available For Rent
        </p>
      </div>
      {results ? (
        <BooksView
          createNotification={createNotification}
          data={books}
          title={`keyword: ${input}`}
        />
      ) : (
        <h3 className="resultsMessage">Search book</h3>
      )}
      {/* {modalBook ? <Modal /> : null} */}
      <NotificationContainer />
    </>
  );
}
