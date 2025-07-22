import { Result } from "postcss";
import { SetStateAction } from "react";
import "./ResultForm.css";

export type ResultFormProps = { handleResult: (a: string) => void };

export const ResultForm = ({ handleResult }: ResultFormProps) => {
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    console.log(`The form was submitted with the value ${e.target[0].value}`);
    handleResult(e.target[0].value);
  }

  function handleTextChange(e: any) {
    const textarea = e.target;
    textarea.style.height = "inherit"; // Temporarily make the height 'inherit' to get the correct scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight to fit the content
  }
  return (
    <form className="myForm" onSubmit={handleSubmit}>
      <label className="myLabel">Paste your SUTOM result:</label>
      <br></br>
      <textarea
        className="myTextarea"
        cols={30}
        defaultValue=""
        placeholder="#SUTOM #... ./6 XX:YY"
        onChange={handleTextChange}
      />
      <div></div>
      <button type="submit" className="button-3" role="button">
        Compute Score
      </button>
    </form>
  );
};
