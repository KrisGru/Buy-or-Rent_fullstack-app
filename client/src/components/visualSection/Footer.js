const Footer = () => (
  <div
    className="bgFooter"
    style={{ backgroundImage: `url('/assets/unplash.png')` }}
  >
    <div className="columns">
      <div className="column footerLogo ">
        <img src="/assets/logo.png" alt="logo" />
      </div>
      <div className="column">
        <h5>TopNav</h5>
        <p>Home</p>
        <p>Shop</p>
        <p>Contact</p>
        <p>Sign up</p>
      </div>
      <div className="column">
        <h5>AccountNav</h5>
        <p>Your Account</p>
        <p>Borrowed</p>
        <p>Returned</p>
        <p>Bought</p>
      </div>
      <div className="column">
        <h5>Social media</h5>
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Twitter</p>
        <p>Whatsaap</p>
      </div>
    </div>
    <p className="copyrights">
      &copy; 2021 All Copyrights Reserved - BoR (Buy or Rent)
    </p>
  </div>
);

export default Footer;
