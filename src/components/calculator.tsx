'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className="w-64 mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full mb-4 text-right text-2xl font-bold"
      />
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((btn) => (
          <Button
            key={btn}
            onClick={() =>
              btn === '/' ? performOperation(btn) : inputDigit(btn)
            }
            variant={btn === '/' ? 'secondary' : 'default'}
          >
            {btn}
          </Button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <Button
            key={btn}
            onClick={() =>
              btn === '*' ? performOperation(btn) : inputDigit(btn)
            }
            variant={btn === '*' ? 'secondary' : 'default'}
          >
            {btn}
          </Button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <Button
            key={btn}
            onClick={() =>
              btn === '-' ? performOperation(btn) : inputDigit(btn)
            }
            variant={btn === '-' ? 'secondary' : 'default'}
          >
            {btn}
          </Button>
        ))}
        <Button onClick={() => inputDigit('0')}>0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button onClick={() => performOperation('=')} variant="primary">
          =
        </Button>
        <Button onClick={() => performOperation('+')} variant="secondary">
          +
        </Button>
        <Button
          onClick={clearDisplay}
          className="col-span-4"
          variant="destructive"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
