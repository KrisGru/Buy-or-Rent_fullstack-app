import { Outlet, NavLink } from 'react-router-dom';
import { ImBooks } from 'react-icons/im';

const Account = ({ dataUser, setDataUser }) => {
  const { login, typeUser } = dataUser.data;

 

  return (
    <div className="containerAccountNav">
      <h1>Hi, {login} <ImBooks/></h1>
      <nav className="accountNavs">
        <NavLink className="navAccountLink" end to="/account" >Your account</NavLink>
        <NavLink className="navAccountLink" to="rented" >Rented</NavLink>
        <NavLink className="navAccountLink" to="bought" >Bought</NavLink>
        <NavLink className="navAccountLink" to="returned" >Returned</NavLink>
        <div className="space"></div>
        {typeUser==="admin" ?
        <>
          <NavLink className="navAccountLink" to="admin" >Admin</NavLink>
          <NavLink className="navAccountLink" to="admin" >Admin</NavLink>
          <NavLink className="navAccountLink" to="admin" >Admin</NavLink>
        </>
        : null
        }
        <NavLink  className="navAccountLink" to="admin" >{typeUser}</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default Account;
