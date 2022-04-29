import { MdAccessTime } from 'react-icons/md';

export default function BasketItem({ book, deleteBook, type, apiAction, handleAllBuy }) {
    const { listPrice } = book.saleInfo
    const { authors, categories, publishedDate, title, subtitle, imageLinks, pageCount, infoLink } = book.volumeInfo
    return (
      <div className="bgBasketItem">
        <div className="basketItem">
          <h3>{title}</h3>
          <div className="basketItem-item">
            <div>{book.volumeInfo.hasOwnProperty("imageLinks") ? <img src={imageLinks.thumbnail} alt="bookCover"/> : <div className="book__image">Brak zdjęcia</div>}</div>
            <div className="basketItem-data">
              <strong>{subtitle ? `subtitle: ${subtitle}` : null}</strong>
              <p>autor: {authors}</p>
              <div className="bookData">
                <p className="bookData__category">{categories}</p>
                <p className="bookData__publishedDate">{publishedDate}</p>
                <p className="bookData__pageCount">{pageCount} pages</p>
              </div>
              <a className="btnBasket" type="button" href={infoLink} rel="noreferrer noopener" target="_blank" >More information</a>
            </div>
          </div>
          <div className="basketItem-price">
            {type==="buy" ? <p className="greenPrice">{listPrice.amount}{listPrice.currencyCode}</p> : <p className="brownPrice"><MdAccessTime /> 1 month</p>}
            <button className="btnBasket" onClick={()=> handleAllBuy(book, apiAction)} > {type==="buy" ? "Buy" : "Rent"} </button>
            <button className="btnBasket" onClick={()=> deleteBook(book.etag, apiAction)}>Delete</button>
          </div>
        </div>
      </div>
    )
  }
  