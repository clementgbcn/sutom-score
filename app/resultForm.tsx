import { Result } from "postcss";
import { SetStateAction } from "react";
import "./ResultForm.css"

export type ResultFormProps = {handleResult: (a: string) => void}

export const ResultForm = ({handleResult}: ResultFormProps) => {
    function handleSubmit(e: any) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        console.error(`The form was submitted with the value ${e.target[0].value}`);
        handleResult(e.target[0].value);
    }
    return (
        <form onSubmit={handleSubmit} >
        <label>Paste your SUTOM result:</label>
        <div></div>
        <textarea cols={40} rows={5} defaultValue="I really enjoyed biking yesterday!"/>
        <div></div>
        <button type="submit" className="button-3" role="button">Compute Score</button>
        </form>
    )
}
