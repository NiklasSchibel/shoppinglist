import {Item} from "../models/ItemModel";
import {ChangeEventHandler, Dispatch, KeyboardEventHandler, SetStateAction, useState} from "react";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';
// @ts-ignore: or cast to : any
import {v4 as uuid} from 'uuid' ;
import {Input} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './AddItem.scss';


interface AddItemProps {
    items: Item[],
    setItems: Dispatch<SetStateAction<Item[]>>
}

export default function AddItem(props: AddItemProps) {
    let navigate = useNavigate();
    const {items, setItems} = props; //destruction, unnecessary to use "props." below
    const [inputValue, setInputValue] = useState<string>("");
    const [inputNumber, setInputNumber] = useState<string>("1");

    const handleAddButtonFunc: () => void = // hier steht nur die TypenDeklaration der Funktion
        () => {
            if (parseInt(inputNumber) <= 0) {
                alert("Quantity darf nicht kleiner 1 sein!");
                return;
            }
            if (checkIfEmpty(inputValue)) {
                return;
            }
            if (checkIfAllreadyExist(inputValue)) { //aufräumen!!
                const newItems: Item[] = [...items];
                newItems.filter(item => item.name === inputValue)[0].quantity = newItems.filter(item => item.name === inputValue)[0].quantity + parseInt(inputNumber);
                setItems(newItems);
                setInputValue("");
                return;
            }

            const newItem: Item = {
                id: uuid(),
                name: inputValue,
                quantity: parseInt(inputNumber),
            };

            const newItems: Item[] = [...items, newItem];
            setItems(newItems);
            setInputValue("");
        }; //ab zweite Zeile steht die eigentliche Funktion

    const checkIfEmpty: (stringInput: string) => boolean = (stringInput) => {
        return stringInput.trim() === "";
    }

    const checkIfAllreadyExist: (stringInput: string) => boolean = (stringInput) => {
        if (items.filter(item => item.name === stringInput).length === 1) {
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

    const handleNavigateButton: () => void = () => {
        navigate(-1);
    }

    return (
        <div className="add-item">
            <h2 className="App-header">AddItem:
            <div className='add-item-box'>
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
                <Input value={inputValue}
                       onChange={onChangeHandler}
                       onKeyPress={keyPressHandler}
                       placeholder=""
                />
                <Button variant="outlined" onClick={handleAddButtonFunc}>AddItem</Button>
            </div>
            <Button className="button-back" onClick={handleNavigateButton}>
                back
            </Button>
            </h2>
        </div>
    )
}