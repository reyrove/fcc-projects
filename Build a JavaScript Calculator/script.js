const { useState } = React;

const isOperator = /[x/+‑]/;
const endsWithOperator = /[x+‑/]$/;

const App = () => {
  const [currentVal, setCurrentVal] = useState("0");
  const [formula, setFormula] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setCurrentVal("0");
    setFormula("");
    setEvaluated(false);
  };

  const handleNumber = (e) => {
    const value = e.target.value;
    if (evaluated) {
      setCurrentVal(value);
      setFormula(value !== "0" ? value : "");
      setEvaluated(false);
    } else {
      if (currentVal === "0" || isOperator.test(currentVal)) {
        setCurrentVal(value);
      } else {
        setCurrentVal(currentVal + value);
      }
      setFormula((prev) =>
        (prev === "" && value === "0") || endsWithOperator.test(prev)
          ? prev + value
          : prev + value
      );
    }
  };

  const handleDecimal = () => {
    if (evaluated) {
      setCurrentVal("0.");
      setFormula("0.");
      setEvaluated(false);
    } else if (!currentVal.includes(".")) {
      setCurrentVal((prev) => prev + ".");
      setFormula((prev) =>
        prev === "" || endsWithOperator.test(prev)
          ? prev + "0."
          : prev + "."
      );
    }
  };

  const handleOperator = (e) => {
    const value = e.target.value;
    if (evaluated) {
      setFormula(currentVal + value);
      setEvaluated(false);
    } else {
      if (!endsWithOperator.test(formula)) {
        setFormula((prev) => prev + value);
      } else {
        if (value === "-" && !/‑$/.test(formula)) {
          setFormula((prev) => prev + value);
        } else {
          setFormula((prev) => prev.replace(endsWithOperator, value));
        }
      }
    }
    setCurrentVal(value);
  };

  const handleEquals = () => {
    let exp = formula.replace(/x/g, "*").replace(/‑/g, "-");

    while (endsWithOperator.test(exp)) {
      exp = exp.slice(0, -1);
    }

    let result;
    try {
      result = eval(exp);
      result = Math.round(result * 1000000000000) / 1000000000000;
    } catch {
      result = "Error";
    }

    setCurrentVal(String(result));
    setFormula(exp + "=" + result);
    setEvaluated(true);
  };

  return (
    <div className="calculator">
      <div id="display">{currentVal}</div>
      <button id="clear" onClick={handleClear}>AC</button>
      <button id="divide" value="/" onClick={handleOperator}>/</button>
      <button id="multiply" value="x" onClick={handleOperator}>x</button>
      <button id="seven" value="7" onClick={handleNumber}>7</button>
      <button id="eight" value="8" onClick={handleNumber}>8</button>
      <button id="nine" value="9" onClick={handleNumber}>9</button>
      <button id="subtract" value="‑" onClick={handleOperator}>‑</button>
      <button id="four" value="4" onClick={handleNumber}>4</button>
      <button id="five" value="5" onClick={handleNumber}>5</button>
      <button id="six" value="6" onClick={handleNumber}>6</button>
      <button id="add" value="+" onClick={handleOperator}>+</button>
      <button id="one" value="1" onClick={handleNumber}>1</button>
      <button id="two" value="2" onClick={handleNumber}>2</button>
      <button id="three" value="3" onClick={handleNumber}>3</button>
      <button id="equals" onClick={handleEquals}>=</button>
      <button id="zero" value="0" onClick={handleNumber}>0</button>
      <button id="decimal" onClick={handleDecimal}>.</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
