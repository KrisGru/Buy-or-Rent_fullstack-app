import OneOrder from "../../components/OneOrder";

export default function Rented({ dataUser }) {
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
