import './App.css';
import {useMultistepForm} from "./useMultistepForm";
import {useState} from "react";
import {UserForm} from "./UserForm";
import {AddressForm} from "./AddressForm";
import {AccountForm} from "./AccountForm";


const INITIAL_DATA = {
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
}


function App() {
    // save local data (what we typed just now)
    const [data, setData] = useState(INITIAL_DATA)
    // update
    function updateFields(fields) {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} =
        useMultistepForm([
            <UserForm {...data} updateFields={updateFields}/>,
            <AddressForm {...data} updateFields={updateFields}/>,
            <AccountForm {...data} updateFields={updateFields}/>,
        ])

    // When press on next, submit if possible
    function onSubmit(e) {
        e.preventDefault()
        if (!isLastStep) return next()
        alert("Successful Account Creation")
    }

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                {/*handel current step and total step (current/total) */}
                <div style={{position: "absolute", top: ".5rem", right: ".5rem"}}>
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div
                    style={{
                        marginTop: "1rem",
                        display: "flex",
                        gap: ".5rem",
                        justifyContent: "flex-end",
                    }}>
                    {/*do not show back button if it is the first page(check index)*/}
                    {!isFirstStep && (
                        <button type="button" onClick={back}>
                            Back
                        </button>
                    )}
                    {/*do not show the next button if it is the last page*/}
                    <button type="submit" onClick={next}>{isLastStep ? "Finish" : "Next"}</button>
                </div>
            </form>
        </div>
    );
}

export default App;
