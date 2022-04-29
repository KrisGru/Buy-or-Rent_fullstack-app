import ReactTooltip from 'react-tooltip';
import { MdShoppingCart } from 'react-icons/md';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { BsHourglassSplit } from 'react-icons/bs';


const BookView = ({ book, setModalBook, setBasketBuy, setBasketRent, createNotification }) => {
  const { authors, categories, publishedDate, title, subtitle, imageLinks } = book.volumeInfo
  const checkPropertyImage = book.volumeInfo.hasOwnProperty("imageLinks")
  const { saleability } = book.saleInfo

  return (
    <>
      <div className="icons">
        <BsHourglassSplit className="forRent" size={28} onClick={()=> {
            setBasketRent(oldArray => [...oldArray, book]);
            createNotification('success', "add to rental basket")
          }} />
        {saleability==="FOR_SALE" ?
          <MdShoppingCart className="forSale" size={28} onClick={()=> {
              setBasketBuy(oldArray => [...oldArray, book])
              createNotification('success', "add to basket")
            }} />
          :
          <MdRemoveShoppingCart className="notForSale" onClick={()=> createNotification('error', "NOT FOR SALE")} size={28} />
        }
      </div>
      <div className="bookView" key={book.etag} onClick={()=>{setModalBook(book)}} data-toggle="modal" data-target="#myModal" >

        <div>{checkPropertyImage ? <img className="book__image" src={imageLinks.thumbnail} alt="bookCover" /> : <div>Brak zdjęcia</div>}</div>
        <strong className="bookView__title">{title}{subtitle ? `: ${subtitle}` : null}</strong>
        <p>{authors}</p>
        <p className="bookView__category">{categories}</p>
        <p className="bookView__publishedDate">{publishedDate}</p>
      </div>
      <ReactTooltip id={book.etag} place="left" effect="solid">
        For Rent
      </ReactTooltip>
    </>
  )
}

export default BookView;
