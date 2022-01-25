import React, {useState} from 'react';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import ShoppingList from "./pages/ShoppingList";
import AddItem from "./pages/AddItem";
import {Item} from "./models/ItemModel";
import FullShoppingList from "./pages/FullShoppingList";

// wichtig: schreibe für jede einzelne Komponente ihr eigenes Interface, mit dieser wird der Parameter props, typisiert
// übersichtlich wenn die porps anschließend wieder destructed werden

// Get schreiben dass alle Listeneinträge angezeigt werden
//post add item

interface AppProps {

}

export default function App(props: AppProps) {
    const [items, setItems] = useState<Item[]>([]);
    //empty Array mit den Items für die ShoppingList


    return (
        <div className="App App-header">
            <Routes>
                <Route path="*" element={<FullShoppingList
                />}/>
                <Route path="/AddItem" element={<AddItem
                    items={items}
                    setItems={setItems}
                />}/>
                <Route path="/ShoppingList" element={<ShoppingList
                    items={items}
                    setItems={setItems}
                />}/>
                <Route path="/FullShoppingList" element={<FullShoppingList/>}/>
            </Routes>
        </div>
    );
}

