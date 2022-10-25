const buttons = {}
const currentOperation = {
  firstNumber: 0,
  secondNumber: null,
  operator: null,
  displayValue: '0'
}
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  x: (a, b) => a * b,
  '/': (a, b) => a / b,
  eq: (a, b) => b,
  reset: () => {
    currentOperation.firstNumber = 0
    currentOperation.secondNumber = null
    currentOperation.operator = null
    currentOperation.displayValue = '0'
    updateScreen()
  },
  del: (a) => a.slice(0, -1)
}
const screen = document.querySelector('.screen > span')

const addButtonsListeners = () => {
  document.querySelectorAll('.keypad > button').forEach(btn => {
    buttons[btn.id] = btn

    btn.addEventListener('click', handleButtonClick)
  })
}

const addKeyboardListener = () => {
  document.addEventListener('keydown', e => {
    e.preventDefault()
    e.stopPropagation()
    const { key } = e
    const button = buttons[key]

    if (button) button.click()

    if (!button) {
      if (key === 'Enter') buttons.eq.click()
      if (key === 'Backspace') buttons.del.click()
      if (key === 'Escape') buttons.reset.click()
      if (key === 't') {
        const themeSwitcher = document.querySelector('#themeSwitcher')
        const nextValue = Number(themeSwitcher.value) + 1
        themeSwitcher.value = nextValue > 3 ? '1' : nextValue.toString()
        const changeEvent = new Event('change')
        themeSwitcher.dispatchEvent(changeEvent)
      }
    }
  })
}

const handleButtonClick = e => {
  const { id } = e.target
  !isNaN(id) || id === '.' ? handleNumberClick(id) : handleOperatorClick(id)
}

const handleNumberClick = number => {
  const screenValue = getScreenValue()

  if (number === '.' && currentOperation.displayValue.includes('.')) return

  currentOperation.displayValue = currentOperation.displayValue === '0' || (currentOperation.operator !== null && currentOperation.secondNumber === 0)
    ? number
    : screenValue + number

  if (currentOperation.operator === null) {
    currentOperation.firstNumber = Number(currentOperation.displayValue)
  }

  if (currentOperation.operator !== null) {
    currentOperation.secondNumber = Number(currentOperation.displayValue)
  }

  updateScreen()
}

const handleOperatorClick = operator => {
  if (operator === 'reset') {
    operations[operator]()
    return
  }

  if (operator === 'del') {
    currentOperation.displayValue = operations.del(currentOperation.displayValue)
    currentOperation.operator === null
      ? currentOperation.firstNumber = Number(currentOperation.displayValue)
      : currentOperation.secondNumber = Number(currentOperation.displayValue)
    updateScreen()
    return
  }

  if (currentOperation.operator === null) {
    currentOperation.operator = operator
    currentOperation.secondNumber = 0
    if (currentOperation.displayValue !== currentOperation.firstNumber.toString()) {
      currentOperation.firstNumber = Number(currentOperation.displayValue)
    }
    updateScreen()
    return
  }

  if (operator === 'eq') {
    currentOperation.displayValue = operations[currentOperation.operator](currentOperation.firstNumber, currentOperation.secondNumber).toString()
    currentOperation.operator = null
    currentOperation.firstNumber = 0
    currentOperation.secondNumber = null
    updateScreen()
    return
  }

  currentOperation.firstNumber = operations[currentOperation.operator](currentOperation.firstNumber, currentOperation.secondNumber)
  currentOperation.operator = operator
  currentOperation.secondNumber = 0
  currentOperation.displayValue = currentOperation.firstNumber.toString()
  updateScreen()
}

const getScreenValue = () => {
  return screen.textContent.replaceAll(',', '')
}

const updateScreen = () => {
  screen.textContent = Number(currentOperation.displayValue).toLocaleString('en', { maximumFractionDigits: 10 })
  if (currentOperation.displayValue.slice(-1) === '.') screen.textContent += '.'
}

const init = () => {
  addButtonsListeners()
  addKeyboardListener()
  updateScreen()
}

init()
