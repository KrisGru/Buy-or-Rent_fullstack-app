// import Modal from "../components/visualSection/Modal";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { MdShoppingCart } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import BooksView from "../components/visualSection/BooksView";
const jsonData = require("../components/shop/randomBooksToShop.json");

export default function Shop() {
  const data = jsonData;

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
      <h1 className="headerShop">Shop</h1>
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
      <BooksView
        createNotification={createNotification}
        data={data.popular}
        title="The most popular books"
      />
      <BooksView
        createNotification={createNotification}
        data={data.recommended}
        title="Recommended books"
      />
      <BooksView
        createNotification={createNotification}
        data={data.comedy}
        title="Books from comedy category"
      />
      {/* {modalBook ? (
        <Modal createNotification={createNotification} modalBook={modalBook} />
      ) : null} */}
      <NotificationContainer />
    </>
  );
}
