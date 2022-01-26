import axios from "axios";
import {Item} from "../models/ItemModel";
import {LoginData} from "../models/LoginData";
import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";


export const loginRequest = (login: LoginData) =>
    axios.post(`/auth/login`, login)
        .then(response => response.data)
        .catch(console.error)


export const getAllTodosTest = (token?: string) =>

    axios.get('/api/shoppinglist/test/Mongo', token ? {
        headers: {
            "Authorization": "Bearer " + token
        }
    } : {}).then(response => response.data)
        .catch((error) => {
            console.log(error);
        })

export const updateItem = (item: Item, token?: string) => {
    axios.put(`/api/shoppinglist/test/Mongo/${item.id}`, item, token ? {
        headers: {
            "Authorization": "Bearer " + token
        }
    } : {}).catch(console.error)
}

//todo delete funktioniert noch nicht
export const deleteItemByID = (item: Item, token?: string) =>
    axios.delete(`/api/shoppinglist/test/Mongo/${item.id}`, token ? {
        headers: {
            "Authorization": "Bearer " + token
        }
    } : {})
        .then(() => console.log("Delete was Successfull"))
        .catch((error) => {
            console.log(error.message);
        })

//kann das im FrontEnd weg?
// export const getItemByID: (item: Item) => void =
//     (item) => {
//         axios.get(`/api/shoppinglist/test/Mongo/${item.id}`).catch(console.error)
//     }

