import {Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import React, {ChangeEvent, ChangeEventHandler, Dispatch, KeyboardEventHandler, SetStateAction, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import './LoginPage.scss';
import {LoginData} from "../models/LoginData";
import {loginRequest} from "../service/requestserviceTest";


interface LoginPageProps {
    token: String,
    setToken: Dispatch<SetStateAction<string>>
}

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export const LOCAL_STORAGE_KEY: string = "My_token_key"


export default function LoginPage(props: LoginPageProps) {
    const {token, setToken} = props; //destruction, danach muss keine props mehr verwendet werden

    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [usernameValue, setUsernameValue] = useState<String>("");
    // const [token, setToken] = useState<String>("default Test Token");//nicht hinzufügen wird über props übergeben



    const onChangeHandlerUserName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
        = (event) => {
        event.preventDefault();
        setUsernameValue(event.target.value);
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleChange =
        (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleSubmitButton: () => void = () => {
        console.log("This is the Username: " + usernameValue)
        console.log("This is the Password: " + values.password)
        const login: LoginData = {
            name: usernameValue,
            password: values.password,
        };


        // localStorage.setItem() Alternative mit key von oben
        loginRequest(login).then((response: string)=>(setToken(response)));
    }

    const keyPressHandler: KeyboardEventHandler<HTMLDivElement>
        = (event) => { //TypenDeklaration von oben klappt nicht! warum??
        if (event.code === "Enter") {
            handleSubmitButton();
        }
    };

    //Use react router navigate um nach dem anmelden auf die Main Page zu kommen

    return (
        <div className="LoginPage">
            <h1>Login:</h1>
            <div className="InputData">
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={usernameValue}
                    onChange={onChangeHandlerUserName}
                />

                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        onKeyPress={keyPressHandler}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <Button className="button-back" onClick={handleSubmitButton}>
                Submit
            </Button>
        </div>

    )
}