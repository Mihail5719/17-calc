// 1. Находим элементы в DOM
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const resultBox = document.getElementById('result');
const buttonsContainer = document.querySelector('.buttons');

// 2. Вешаем обработчик событий на контейнер кнопок (делегирование)
buttonsContainer.addEventListener('click', function (event) {
  // Проверяем, что кликнули именно по кнопке, а не по отступам
  if (!event.target.matches('button')) {
    return;
  }

  // Получаем значение операции из атрибута data-op (например, "+", "-" и т.д.)
  const operation = event.target.dataset.op;

  // Получаем значения из полей ввода и преобразуем в числа
  const num1 = Number(input1.value);
  const num2 = Number(input2.value);

  // 3. Проверка валидности (если поля пустые или введено не число)
  if (
    input1.value === '' ||
    input2.value === '' ||
    isNaN(num1) ||
    isNaN(num2)
  ) {
    showResult('Введите оба числа!', true);
    return;
  }

  let result;

  // 4. Выполняем вычисления
  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        showResult('На ноль делить нельзя!', true);
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  // 5. Вывод результата
  // Исправляем проблему точности в JS (например, 0.1 + 0.2)
  const formattedResult = parseFloat(result.toFixed(10));
  showResult(`Результат: ${formattedResult}`, false);
});

// Вспомогательная функция для вывода текста и смены цвета
function showResult(text, isError) {
  resultBox.textContent = text;

  if (isError) {
    resultBox.classList.add('error');
  } else {
    resultBox.classList.remove('error');
  }
}
