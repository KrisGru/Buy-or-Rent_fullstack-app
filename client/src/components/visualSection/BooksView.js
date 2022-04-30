import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BookView from "../visualSection/BookView";

export default function BooksView({
  title,
  data,

  createNotification,
}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="bgcarousel">
      <div className="carousel">
        <h1 className="carousel__title">{title}</h1>
        <Carousel responsive={responsive}>
          {data.map((book) => (
            <BookView
              createNotification={createNotification}
              book={book}
              key={book.etag}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
