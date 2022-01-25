import axios from "axios";
import {Item} from "../models/ItemModel";
import {LoginData} from "../models/LoginData";

// const INDEV = process.env.NODE_ENV === "development"
// const BASEURL: string = INDEV ? "http://localhost:8080" : "";

// const headers = token => ({
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// })

export const updateItem: (item: Item) => void =
    (item) => {
        // axios.put(BASEURL + `/api/shoppinglist/test/Mongo/${item.id}`, item).catch(console.error)
        axios.put( `/api/shoppinglist/test/Mongo/${item.id}`, item).catch(console.error)
}

//kann das im FrontEnd weg?
export const getItemByID: (item: Item) => void =
    (item) => {
        axios.get( `/api/shoppinglist/test/Mongo/${item.id}`).catch(console.error)
    }

export const deleteItemByID = (item: Item) =>
    axios.delete( `/api/shoppinglist/test/Mongo/${item.id}`)
        .then(() => console.log("delete Successfull"))
        .catch((error) => {
            console.log(error.message);
        })

export const loginRequest = (login: LoginData) =>
    axios.post( `/auth/login`, login)
        .then(response => response.data)
        .catch(console.error)


//vielleicht noch mitverwenden

// + loca
// du kannst später aus dem TOken den Username extrahieren!!
//Todo hier später weiter

export const getAllTodosTest = (token: string) =>

    axios.get(  '/api/shoppinglist/test/Mongo', {
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then(response => response.data).catch((error) => {
        console.log(error);
    })

// export const deleteTodo = id => axios.delete(`/api/todo/${id}`)
