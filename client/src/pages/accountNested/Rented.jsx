import { useContext } from "react";
import OneOrder from "../../components/OneOrder";
import { AppContext } from "../../utils/boxOfStates";

export default function Rented() {
  const { dataUser } = useContext(AppContext);
  const { rentedOrders } = dataUser.data;
  return (
    <div className="userContainer">
      {rentedOrders.map((rentedOrder) => (
        <OneOrder
          order={rentedOrder.order}
          key={rentedOrder.time}
          time={rentedOrder.time}
        />
      ))}
    </div>
  );
}
