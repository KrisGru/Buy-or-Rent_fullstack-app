const Contact = () => (
  <>
    <h1 className="headerContact">Contact us! </h1>
    <div className="contact">
      <div className="contact__data">
        <p>Śniadeckich 18/3, 00-000 Nigdzie</p>
        <p>buyorrent@thebest.nigdzie.com</p>
        <div className="contact__map">Place on the map</div>
      </div>
      <div className="contact__form">
        <form >
          <div className="form-group">
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            <input className="form-control" type="text" placeholder="Subject" />
            <textarea className="form-control" id="textArea" rows="3" placeholder="Message"></textarea>
            <button className="button darkBtn" variant="primary" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </>
)

export default Contact;
