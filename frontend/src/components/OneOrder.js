export default function OneOrder({ order, time }) {
    const amountBooksInOrder = order.length
    console.log('oneOrder', order)
    console.log(amountBooksInOrder)

    function backgroundImage() {
      let bgImage;
      if(amountBooksInOrder===undefined) {
        if(order.volumeInfo.hasOwnProperty("imageLinks")) {
          bgImage = `url("${order.volumeInfo.imageLinks.thumbnail}")`
          return bgImage
        } else {
          return bgImage = "radial-gradient(black, transparent)"
        }
      } else { //object order have more element/books
        if(order[0].volumeInfo.hasOwnProperty("imageLinks")) {
          return (
            bgImage = `url("${order[0].volumeInfo.imageLinks.thumbnail}")`
          )
        } else {
          return bgImage = `url("${order[1].volumeInfo.imageLinks.thumbnail}")`
        }
      }
    }
    
  
    return (
      <>
        <div className="finishedOrder" style={{backgroundImage: `${backgroundImage()}`}}>
          <div className="finishedOrder__info">
            <span><strong>Date: </strong>{time}</span>
            <span><strong>Amount Books: </strong> {amountBooksInOrder ? amountBooksInOrder : 1 }</span>
            <span><strong>Price: </strong> 20PLN</span>
            <span><strong>Order number: </strong> 267896445</span>
          </div>
          {amountBooksInOrder===undefined ? 
            <ItemFromOrder item={order}/>
            : 
            <div className="finishedOrder__morePositionInOrder">
              {order.map(element => <ItemFromOrder item={element} /> )}
            </div>
          }
        </div>
      </>
    )
  }
  
  function ItemFromOrder({ item }) {
    const { authors, categories, publishedDate, title, subtitle, imageLinks, infoLink } = item.volumeInfo
    return (
      <div className="elementInOrder"  >
        <div className="elementInOrder__lightBackground"></div>
          <div className="elementInOrder__content" >
            <div>{item.volumeInfo.hasOwnProperty("imageLinks") ? <img className="book__image" src={imageLinks.smallThumbnail} alt="bookCover"/> : <div className="book__image">Brak zdjęcia</div>}</div>
            <div className="elementData">
              <strong className="elementData__title">{title}{subtitle ? `: ${subtitle}` : null}</strong>
              <p>{authors}</p>
              <p className="elementData__category">{categories}</p>
              <p className="elementData__publishedDate">{publishedDate}</p>
              <button className="button darkBtn" href={infoLink} rel="noreferrer noopener" target="_blank" >More information</button>
            </div>
          </div>
      </div>
    )
  }