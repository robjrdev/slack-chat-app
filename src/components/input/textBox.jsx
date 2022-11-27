import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import InputPlacholder from './inputPlacholder';
import { PasswordIcons } from './inputIcons';


const TextInput = forwardRef(({
  name = "",
  email = false,
  password = false,
  number = false,
  text = true,
  required = false,
  deactivate = false,
  placeholderText = "Enter Data Here",
  min = 0,
  max = 9999,
}, ref) => {

  const [userInput, setUserInput] = useState("");
  const [isValid, setIsValid] = useState({ show: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  //State Management for Functions
  useImperativeHandle(ref, () => ({
    clearValue() {
      setUserInput("");
    },
    alertHere() {
      alert('imperative')
    }
  }));

  const onChangeInput = (e) => {
    if (deactivate) return;
    let Input = e.target.value;
    email && setIsValid({ show: isValidEmail(Input), message: "Not Email Format" });
    number && !isValidNumber(Input) && setUserInput((prevValue) => prevValue);
    password &&
      setIsValid({
        show: isValidPassword(Input),
        message:
          "Must contain at least 1 lower and uppercase character, 1 numeric character, 1 special character, and at least 8 characters",
      });

    !email && !number && !password && setIsValid({ show: true, message: null });
    if (!number) {
      setUserInput(Input);
    } else {
      // if (Input < min) return
      Number(Input) || Input.trim() === ""
        ? setUserInput(Input)
        : setUserInput((prevInput) => prevInput);
    }
  };

  const eyeClick = (e) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  const isValidPassword = (input) => {
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(input);
  };

  const isValidEmail = (input) => {
    return input.trim() === "" ? true : /\S+@\S+\.\S+/.test(input);
  };

  const isValidNumber = (input) => {
    return input.trim() === "" || input.trim() === "-"
      ? true
      : /^\d+$/.test(input) || /^-\d+$/.test(input);
  };

  const isValidRange = (input) => {
    setIsValid({
      show: Number(input) >= Number(min) && Number(input) <= Number(max),
      message:
        Number(input) < Number(min)
          ? "Input is less than minimum range"
          : Number(input) > Number(max) &&
            "Input is greater than maximum range",
    });
  };

  const incrementState = () => {
    if (deactivate) return;
    setUserInput(Number(userInput) + 1);
  };

  const decrementState = () => {
    if (deactivate) return;
    setUserInput(Number(userInput) - 1);
  };
  return (
    <div name={`div${name}`} className="input-container">
        <input
          name={name}
          data-inputname={name}
          className="input-container__textbox"
          type={!password ? "text" : showPassword ? "text" : "password"}
          placeholder=" "
          value={userInput}
          onChange={onChangeInput}
          autoComplete="off"
          autoCorrect="off"
          style={{
            width: number ? "88%" : "93%",
          }}
        ></input>
        <InputPlacholder display={placeholderText} deactivate={deactivate} />
        {number && (
          <div className="placeholder-icons-container">
            <button className="placeholder-button" onClick={incrementState}>
              <IoIosArrowUp />
            </button>
            <button className="placeholder-button" onClick={decrementState}>
              <IoIosArrowDown />
            </button>
          </div>
        )}
        {password && (
          <div className="placeholder-icons-container">
            <PasswordIcons
              displayPassword={showPassword}
              onClickDisplayPassword={eyeClick}
            />
          </div>
        )}
        {!isValid.show && <div className="validation">{isValid.message}</div>}
      </div>
  )
})

export default TextInput