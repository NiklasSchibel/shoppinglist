import {Item} from "../models/ItemModel";
import AddItemFullstack from "../components/AddItemFullstack";
import axios from 'axios'
import {useContext, useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteItemByID, getAllTodosTest, updateItem} from "../service/requestserviceTest";
import {AuthContext} from "../context/AuthProvider";


interface FullShoppingListProps {
    token: string
}
export default function FullShoppingList() {
    // const {token} = props;
    const [itemsFullstack, setItemsFullstack] = useState<Item[]>([])

    const {token, jwtDecoded} = useContext(AuthContext)

    useEffect(() => {
        getAllTodosTest(token)
            .then(items => setItemsFullstack(items))
            .catch(error => console.error(error))
    }, [])

    const handleAddOneToQuantityButtonFunc = (item: Item) => {
        const newItems: Item[] = [...itemsFullstack];
        if (newItems.find(i => i.id === item.id) !== undefined) {
            // @ts-ignore
            newItems.find(i => i.id === item.id).quantity++;
            setItemsFullstack(newItems);
            // @ts-ignore
            updateItem(newItems.find(i => i.id === item.id));
        }
    }

    const handleSubstractOneOfQuantityButtonFunc = (item: Item) => {
        const newItems: Item[] = [...itemsFullstack];
        if (newItems.find(i => i.id === item.id) !== undefined) {
            // @ts-ignore
            newItems.find(i => i.id === item.id).quantity--;
            setItemsFullstack(newItems);
            // @ts-ignore
            updateItem(newItems.find(i => i.id === item.id));
        }
    }


    const handleRemoveButtonFunc = (item: Item) => {
        const newItems: Item[] = [...itemsFullstack];

        if (newItems.find(i => i.id === item.id) !== undefined) {
            // @ts-ignore
            const reducedItems: Item[] = newItems.filter(items => items.id !== item.id);
            setItemsFullstack(reducedItems);
            deleteItemByID(item);
        }
    }


    if (!itemsFullstack){
        return <h1>Loading...please login</h1>
    }


    return (
        <div>
            <AddItemFullstack
                items={itemsFullstack}
                setItems={setItemsFullstack}
            />
            <h1>Shopping List</h1>
            <div>
                {itemsFullstack.map((item: Item, index) => (
                    <div className='item-container' key={index}>
                        <AddIcon onClick={() => {
                            handleAddOneToQuantityButtonFunc(item)
                        }}/>
                        <div className='quantity'>
                            <span className="number-size"> {item.quantity}x </span>
                        </div>
                        <RemoveIcon onClick={() => {
                            handleSubstractOneOfQuantityButtonFunc(item)
                        }}/>
                        <div className="item">{item.name}</div>
                        {/*bei onClick wird nur die Funktion aufgerufen nichts ausgegebn*/}
                        {/*<EditIcon onClick={() => {handleEditButtonFunc(item)}}/>*/}
                        <Button variant="outlined" onClick={() => {
                            handleRemoveButtonFunc(item)
                        }} startIcon={<DeleteIcon/>}>
                            remove
                        </Button>

                    </div>
                ))}
            </div>
            <div>Liste von: {jwtDecoded?.sub?.toUpperCase()}</div>
        </div>
    )

}