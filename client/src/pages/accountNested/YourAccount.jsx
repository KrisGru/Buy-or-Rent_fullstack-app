import { useContext } from "react";
import { AppContext } from "../../utils/boxOfStates";

const YourAccount = () => {
  const { dataUser } = useContext(AppContext);
  const { login, email } = dataUser.data;
  return (
    <div className="userContainer">
      <div className="yourAccount">
        <div className="userData">
          <div className="userData__content">
            <div className="book__image">Brak zdjęcia</div>
            <div className="elementData">
              <p>Login: {login} </p>
              <p>Email: {email} </p>
              <button className="button lightBtn">edit </button>
            </div>
          </div>
        </div>
        <div className="userData">
          <div className="userData__content">
            <div className="elementData">
              <p>bought: 12 </p>
              <p>rented orders: {email} </p>
              <button className="button lightBtn">edit </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;
