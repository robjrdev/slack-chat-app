import React,{useState, useEffect} from 'react'

const InputPlacholder = ({ display = "Search", deactivate = false }) => {
  const [placeholderDisplay, setPlaceholderDisplay] = useState(display);
  return (
    <div className="input-placeholder">
      <label
        id="target"
        htmlFor="userNameInput"
        autoCorrect="off"
        autoComplete="off"        
      >
        {!deactivate ?  `${placeholderDisplay}` : "Disabled"}
      </label>
    </div>
  );
}

export default InputPlacholder