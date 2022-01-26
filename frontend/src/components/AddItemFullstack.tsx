import {Item} from "../models/ItemModel";
import {ChangeEventHandler, Dispatch, KeyboardEventHandler, SetStateAction, useContext, useState} from "react";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
// @ts-ignore: or cast to : any
import {v4 as uuid} from 'uuid' ;
import './AddItemFullstack.scss';
import {updateItem} from "../service/requestserviceTest";
import {AuthContext} from "../context/AuthProvider";


interface AddItemFullstackProps {
    itemsFullstack: Item[],
    setItemsFullstack: Dispatch<SetStateAction<Item[]>>
}

export default function AddItemFullstack(props: AddItemFullstackProps) {
    const {itemsFullstack, setItemsFullstack} = props;
    const [inputValue, setInputValue] = useState<string>("");
    const [inputNumber, setInputNumber] = useState<string>("1");

    const {token, jwtDecoded} = useContext(AuthContext)

    const handleAddButtonFunc: () => void =
        () => {
            if (parseInt(inputNumber) <= 0) {
                alert("Quantity darf nicht kleiner 1 sein!");
                return;
            }
            if (checkIfEmpty(inputValue)) {
                return;
            }
            //todo die checkIfAllreadyExist Funktion umschreiben/testen/prüfen
            if (checkIfAllreadyExist(inputValue)) {
                const newItemsInCheck: Item[] = [...itemsFullstack];
                newItemsInCheck.filter(item => item.name === inputValue)[0].quantity = newItemsInCheck.filter(item => item.name === inputValue)[0].quantity + parseInt(inputNumber);
                const newItemInCheck: Item = newItemsInCheck.filter(item => item.name === inputValue)[0]
                setItemsFullstack(newItemsInCheck);
                setInputValue("");
                updateItem(newItemInCheck, token);
                return;
            }

            const newItem: Item = {
                id: uuid(),
                name: inputValue,
                quantity: parseInt(inputNumber),
                user: jwtDecoded?.sub || "defaultUser",
            };

            //ab hier Porblem da set und User auf der anderen Seite "FullStackShoppingList" stehen
            const newItems: Item[] = [...itemsFullstack, newItem];
            setItemsFullstack(newItems);
            setInputValue("");
            updateItem(newItem, token);
        };

    const checkIfEmpty: (stringInput: string) => boolean = (stringInput) => {
        return stringInput.trim() === "";
    }

    const checkIfAllreadyExist: (stringInput: string) => boolean = (stringInput) => {
        if (itemsFullstack.filter(item => item.name === stringInput).length === 1) {
            console.log("gibt es bereits")
            return true;
        } else {
            console.log("gibt es noch nicht");
            return false;
        }
    }

    const keyPressHandler: KeyboardEventHandler<HTMLDivElement>
        = (event) => { //TypenDeklaration von oben klappt nicht! warum??
        if (event.code === "Enter") {
            handleAddButtonFunc();
        }
    };

    const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
        = (event) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    const onChangeHandlerQuantity: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
        (event) => {
            event.preventDefault();
            setInputNumber(event.target.value);
        }

    return (
        <div className="add-item">
            <div className='add-item-box'>
                <h1>Add Item</h1>
                <div className="AddItemFields">
                    <TextField
                        value={inputNumber}
                        id="outlined-number"
                        label="Quantity"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onChangeHandlerQuantity}
                    />
                    <TextField
                        value={inputValue}
                        label="Name"
                        variant="outlined"
                        onChange={onChangeHandler}
                        onKeyPress={keyPressHandler}
                    />
                    <Button variant="outlined"
                            onClick={handleAddButtonFunc}>AddItem
                    </Button>
                </div>
            </div>
        </div>
    )
}