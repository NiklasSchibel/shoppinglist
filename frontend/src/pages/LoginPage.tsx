import {Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    Dispatch,
    KeyboardEventHandler,
    SetStateAction,
    useContext,
    useState
} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import './LoginPage.scss';
import {LoginData} from "../models/LoginData";
import {loginRequest} from "../service/requestserviceTest";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";


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


export default function LoginPage() {
    // const {token, setToken} = props;
    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [usernameValue, setUsernameValue] = useState<String>("");

    const navigate = useNavigate()

    const {setJwt} = useContext(AuthContext)

    const onChangeHandlerUserName: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
        = (event) => {
        event.preventDefault();
        setUsernameValue(event.target.value);
    }

    const handleChange =
        (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmitButton: () => void = () => {
        console.log("This is the Username: " + usernameValue)
        console.log("This is the Password: " + values.password)
        const login: LoginData = {
            name: usernameValue,
            password: values.password,
        };
        loginRequest(login)
            // .then((response: string)=>(setToken(response)))
            // .then(response => response.data)
            .then((data)=>{
                setJwt(data)
                navigate('/FullShoppingList')
            })
    }

    const keyPressHandler: KeyboardEventHandler<HTMLDivElement>
        = (event) => { //TypenDeklaration von oben klappt nicht! warum??
        if (event.code === "Enter") {
            onSubmitButton();
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
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    // type="password"
                    autoComplete="current-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    onKeyPress={keyPressHandler}
                />
                <IconButton
                    id="ButtonVisibility"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
            </div>
            <Button className="button-submit"
                    variant="contained"
                    onClick={onSubmitButton}>
                Submit
            </Button>
        </div>

    )
}