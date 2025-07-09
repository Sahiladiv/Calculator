import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const inputNumbers: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const constants = { PI: 3.141592653589793238, E: 2.718281828459045 };

function App() {
  const [result, setResult] = useState<number>(0);
  const [summ, setSumm] = useState<number>(0);
  const [decimalCount, setDecimalCount] = useState<number>(0);
  const [d, setD] = useState<number>(1);
  const [tadd, setTadd] = useState<number>(0);
  const [tsub, setTsub] = useState<number>(0);
  const [s, setS] = useState<number>(1);
  const [j, setJ] = useState<number>(0);

  const createNumber = (i: number): number => inputNumbers[i] + summ * 10;
  const createFractionalNumber = (y: number, i: number): number => parseFloat(y.toString()) + (d / 10) * inputNumbers[i];

  const takeInput = (i: number): void => {
    let y: number;
    if (decimalCount === 0) {
      const val = createNumber(i);
      setSumm(val);
      y = val;
    } else {
      const val = createFractionalNumber(summ, i);
      setD(d / 10);
      y = val;
    }
    setResult(y);
  };

  const fractional = (): void => setDecimalCount(1);

  const clearAll = (): void => {
    setSumm(0);
    setDecimalCount(0);
    setD(1);
    setTadd(0);
    setTsub(0);
    setS(1);
    setJ(0);
    setResult(0);
  };

  const handleOperation = (op: string): void => {
    const w = parseFloat(result.toString());
    switch (op) {
      case "+":
        setTadd(tadd + w);
        setResult(tadd + w);
        setSumm(0);
        break;
      case "-":
        setTsub(tsub - w);
        setResult(tsub - w);
        setSumm(0);
        break;
      case "*":
        setS(s * w);
        setResult(s * w);
        setSumm(0);
        break;
      case "/":
        const div = j === 0 ? w / s : s / w;
        setS(div);
        setJ(j + 1);
        setResult(div);
        setSumm(0);
        break;
      case "1/x":
        setResult(1 / w);
        break;
      case "^2":
        setResult(Math.pow(w, 2));
        break;
      case "^3":
        setResult(Math.pow(w, 3));
        break;
      case "sqrt":
        setResult(Math.sqrt(Math.abs(w)));
        break;
      case "cbrt":
        setResult(Math.cbrt(w));
        break;
      case "10^x":
        setResult(Math.pow(10, w));
        break;
      case "ln":
        setResult(Math.log(w));
        break;
      case "log":
        setResult(Math.log10(w));
        break;
      case "sin":
        setResult(Math.sin((Math.PI / 180) * w));
        break;
      case "cos":
        setResult(Math.cos((Math.PI / 180) * w));
        break;
      case "tan":
        setResult(Math.tan((Math.PI / 180) * w));
        break;
      case "!": {
        let fact = 1;
        for (let i = 1; i <= w; i++) fact *= i;
        setResult(fact);
        break;
      }
      case "e":
        setResult(constants.E);
        break;
      case "pi":
        setResult(constants.PI);
        break;
      default:
        break;
    }
  };

  const btnClass = "btn btn-light m-1 shadow-sm";
  const opBtnClass = "btn btn-secondary m-1 shadow-sm";

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: 420 }}>
        <div className="form-control text-end fs-2 mb-3">{result}</div>

        <div className="d-flex flex-wrap justify-content-center">
          {inputNumbers.map((num, idx) => (
            <button key={num} className={btnClass} onClick={() => takeInput(idx)}>
              {num}
            </button>
          ))}
          <button className={btnClass} onClick={fractional}>.</button>
          <button className={btnClass} onClick={() => handleOperation("=")}>=</button>
        </div>

        <div className="d-flex flex-wrap justify-content-center mt-3">
          {["+", "-", "*", "/", "^2", "^3", "sqrt", "cbrt", "10^x", "1/x", "sin", "cos", "tan", "ln", "log", "!", "e", "pi"].map((op) => (
            <button key={op} className={opBtnClass} onClick={() => handleOperation(op)}>
              {op}
            </button>
          ))}
        </div>

        <button className="btn btn-danger w-100 mt-4" onClick={clearAll}>
          AC
        </button>
      </div>
    </div>
  );
}

export default App;