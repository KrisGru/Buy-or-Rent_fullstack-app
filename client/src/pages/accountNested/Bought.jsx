import OneOrder from "../../components/OneOrder";
import { useContext } from "react";
import { AppContext } from "../../utils/boxOfStates";

export default function Bought() {
  const { dataUser } = useContext(AppContext);

  const { boughtOrders } = dataUser.data;
  console.log(boughtOrders);
  return (
    <div className="userContainer">
      {boughtOrders.map((boughtOrder) => (
        <OneOrder
          order={boughtOrder.order}
          key={boughtOrder.time}
          time={boughtOrder.time}
        />
      ))}
    </div>
  );
}
