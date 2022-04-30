import { MdShoppingCart } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import BasketItem from "../components/shop/BasketItem";
import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";

export default function Basket() {
  const { basketBuy, setBasketBuy, setBasketRent, basketRent, dataUser } =
    useContext(AppContext);
  let basketBuyBooks = basketBuy;
  let basketRentBooks = basketRent;
  let time = new Date();

  function totalPrice() {
    let pricesArray = [];
    basketBuyBooks.map((book) =>
      pricesArray.push(
        book.saleInfo.listPrice.amount ? book.saleInfo.listPrice.amount : null
      )
    );
    let amountBook = pricesArray.length;
    let totalPrice = 0;
    for (let i = 0; i < amountBook; i++) {
      totalPrice += pricesArray[i];
    }
    return totalPrice.toFixed(2);
  }

  function deleteBook(id, type) {
    if (type === "boughtOrders") {
      if (id === undefined) {
        setBasketBuy([]);
      } else {
        let basketBuy = basketBuyBooks.filter(function (book) {
          return book.etag !== id;
        });
        setBasketBuy(basketBuy);
      }
    } else {
      if (id === undefined) {
        setBasketRent([]);
      } else {
        let basketRent = basketRentBooks.filter(function (book) {
          return book.etag !== id;
        });
        setBasketRent(basketRent);
      }
    }
  }

  function handleAllBuy(order, apiAction) {
    if (dataUser.logged) {
      let { _id } = dataUser.data;
      fetch(`http://localhost:3001/api/${apiAction}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, order, time }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          deleteBook(order.etag, apiAction);
        });
    } else {
      alert("log in to the portal");
    }
  }

  return (
    <>
      <h1 className="headerBasket">Basket</h1>

      <BasketList
        basket={basketBuyBooks}
        handleAllBuy={handleAllBuy}
        apiAction="boughtOrders"
        type="buy"
        deleteBook={deleteBook}
      />
      <div className="total">
        <div className="totalPrice">
          Total: <span>{totalPrice()} PLN</span>
        </div>
        <button
          className="btnBasket"
          onClick={() => handleAllBuy(basketBuy, "boughtOrders")}
        >
          Buy All
        </button>
      </div>

      <div className="line-betweenBasketLists"></div>
      <BasketList
        basket={basketRentBooks}
        handleAllBuy={handleAllBuy}
        apiAction="rentedOrders"
        type="rent"
        deleteBook={deleteBook}
      />
      <div className="total">
        <div className="totalRentBooks">
          Total: <span>{basketRentBooks.length} books</span>
        </div>
        <button
          className="btnBasket"
          onClick={() => handleAllBuy(basketRent, "rentedOrders")}
        >
          Rent All
        </button>
      </div>
    </>
  );
}

function BasketList({ basket, handleAllBuy, deleteBook, type, apiAction }) {
  return (
    <div className="basketList">
      {type === "buy" ? (
        <div className="basketList__name">
          <MdShoppingCart className="forSale basketIcon" />
          Buy
        </div>
      ) : (
        <div className="basketList__name">
          <BsHourglassSplit className="forRent basketIcon" />
          Rent
        </div>
      )}
      <div className="basketList__content">
        {basket.map((book) => (
          <BasketItem
            type={type}
            apiAction={apiAction}
            handleAllBuy={handleAllBuy}
            key={book.etag}
            book={book}
            deleteBook={deleteBook}
          />
        ))}
        {basket.length ? null : (
          <h3 className="basketList__empty">Empty basket</h3>
        )}
      </div>
    </div>
  );
}
