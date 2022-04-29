import { useContext } from "react";
import { AppContext } from "../../utils/contextState";
import OneOrder from "../../components/OneOrder";

export default function Bought({ dataUser }) {
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
