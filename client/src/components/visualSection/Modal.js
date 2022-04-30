import { MdShoppingCart } from 'react-icons/md';
import { BsHourglassSplit } from 'react-icons/bs';

export default function Modal({ modalBook, setBasketBuy, setBasketRent, createNotification }) {
  const { saleability, listPrice } = modalBook.saleInfo
  const { authors, categories, publishedDate, title, subtitle, imageLinks, pageCount, description, infoLink } = modalBook.volumeInfo
  return (
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">

          <div>
            <div>{modalBook.volumeInfo.hasOwnProperty("imageLinks") ? <img className="book__image" src={imageLinks.thumbnail} alt="bookCover"/> : <div className="book__image">Brak zdjęcia</div>}</div>
            <strong className="book__title">{title}{subtitle ? `: ${subtitle}` : null}</strong>
            <p>{authors}</p>

            <div className="bookData">
              <p className="bookData__category">{categories}</p>
              <p className="bookData__publishedDate">{publishedDate}</p>
              <p className="bookData__pageCount">{pageCount}</p>
            </div>
            <div className="buySection">
              {saleability==="NOT_FOR_SALE" ? <p className="redPrice" >Is not for sale</p> : <p className="greenPrice">{listPrice.amount}{listPrice.currencyCode}</p>}
              {saleability==="NOT_FOR_SALE" ? null :
              <MdShoppingCart size="28" className="forSale"
                onClick={()=> {
                  setBasketBuy(oldArray => [...oldArray, modalBook])
                  createNotification('success', "add to basket")
                }} />}
              <BsHourglassSplit size="28" className="forRent" onClick={()=> {
                setBasketRent(oldArray => [...oldArray, modalBook])
                createNotification('success', "add to rental basket")
              }}/>

            </div>
            <div className="description"><p>Description: </p>{description ? description : "our base has no description"}</div>
            <section className="buttons">
              <a className="button darkBtn" href={infoLink} rel="noreferrer noopener" target="_blank" >More information</a>
            </section>
          </div>

          </div>

        </div>
      </div>
    </div>
  )
}
