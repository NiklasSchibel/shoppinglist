import React, {useState} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import ShoppingList from "./pages/ShoppingList";
import AddItem from "./pages/AddItem";
import LoginPage from "./pages/LoginPage";
import {Item} from "./models/ItemModel";
import FullShoppingList from "./pages/FullShoppingList";

// wichtig: schreibe für jede einzelne Komponente ihr eigenes Interface, mit dieser wird der Parameter props, typisiert
// übersichtlich wenn die porps anschließend wieder destructed werden

// Get schreiben dass alle Listeneinträge angezeigt werden
//post add item

interface AppProps {

}

interface AuthContext

export default function App(props: AppProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [token, setToken] = useState<string>("defaultTokenTest");
    //empty Array mit den Items für die ShoppingList

    // speicher token in local Storage anstatt useState

    return (
        <div className="App App-header">
            <Routes>
                <Route path="*" element={<LoginPage
                    token={token}
                    setToken={setToken}
                />}/>
                <Route path="/AddItem" element={<AddItem
                    items={items}
                    setItems={setItems}
                />}/>
                <Route path="/ShoppingList" element={<ShoppingList
                    items={items}
                    setItems={setItems}
                />}/>
                <Route path="/FullShoppingList" element={<FullShoppingList
                    token={token}
                />}
                />
            </Routes>
        </div>
    );
}

