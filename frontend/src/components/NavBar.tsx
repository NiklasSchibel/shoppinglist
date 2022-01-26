import './NavBar.scss';
import { Link } from "react-router-dom";

// NavBar
export default function NavBar(){
    return(
        <div className="navbar">
            {/*<Link className={"nav-item"} to="/AddItem">AddItem</Link>*/}
            {/*<Link className={"nav-item"} to="/ShoppingList">ShoppingList</Link>*/}
            <Link className={"nav-item"} to="/FullShoppingList">Einkaufsliste</Link>
            <Link className={"nav-item"} to="/Login">Login</Link>
        </div>
    )
}