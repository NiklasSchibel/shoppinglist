import axios from "axios";
import {Item} from "../models/ItemModel";

const INDEV = process.env.NODE_ENV === "development"
const BASEURL: string = INDEV ? "http://localhost:8080" : "";

export const updateItem: (item: Item) => void =
    (item) => {
        axios.put(BASEURL+`/api/shoppinglist/test/Mongo/${item.id}`, item).catch(console.error)
    }

    //kann das im FrontEnd weg?
export const getItemByID: (item: Item) => void =
    (item) => {
        axios.get(BASEURL+`/api/shoppinglist/test/Mongo/${item.id}`).catch(console.error)
    }
    
export const deleteItemByID = (item: Item) =>
    axios.delete(BASEURL+`/api/shoppinglist/test/Mongo/${item.id}` )
        .then(() => console.log("delete Successfull"))
        .catch((error) => {
            console.log(error.message);
        })
        
        
export const getAllTodosTest = () =>
    axios.get(BASEURL+'/api/shoppinglist/test/Mongo')
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })

// export const deleteTodo = id => axios.delete(`/api/todo/${id}`)
