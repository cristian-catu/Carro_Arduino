let isButtonControls = false;
const avanzar = document.getElementById('avanzar');
const izquierda = document.getElementById('izquierda');
const derecha = document.getElementById('derecha');
const retroceder = document.getElementById('retroceder');
const changebutton = document.getElementById('changebutton');

const controlPanel = document.getElementById('control-panel');
const joystickpanel = document.getElementById('joystick-panel');

function request(route) {
  fetch(route)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function changeButtonType() {
  if (isButtonControls) {
    controlPanel.style.display = 'none';
    joystickpanel.style.display = 'block';
    changebutton.textContent = 'Cambiar a controles';

  } else {
    controlPanel.style.display = 'flex';
    joystickpanel.style.display = 'none';
    changebutton.textContent = 'Cambiar a joystick';

  }

  isButtonControls = !isButtonControls;
}

function start() {
  changebutton.addEventListener('click', function () {
    changeButtonType();
  });

  // Avanzar
  avanzar.addEventListener('mousedown', function () {
    request('/forward');
  });

  avanzar.addEventListener('touchstart', function () {
    request('/forward');
  });

  avanzar.addEventListener('mouseup', function () {
    request('/stop');
  });

  avanzar.addEventListener('touchend', function () {
    request('/stop');
  });

  avanzar.addEventListener('touchcancel', function () {
    request('/stop');
  });

  // Izquierda
  izquierda.addEventListener('mousedown', function () {
    request('/left');
  });

  izquierda.addEventListener('touchstart', function () {
    request('/left');
  });

  izquierda.addEventListener('mouseup', function () {
    request('/stop');
  });

  izquierda.addEventListener('touchend', function () {
    request('/stop');
  });

  izquierda.addEventListener('touchcancel', function () {
    request('/stop');
  });

  // Derecha
  derecha.addEventListener('mousedown', function () {
    request('/right');
  });

  derecha.addEventListener('touchstart', function () {
    request('/right');
  });

  derecha.addEventListener('mouseup', function () {
    request('/stop');
  });

  derecha.addEventListener('touchend', function () {
    request('/stop');
  });

  derecha.addEventListener('touchcancel', function () {
    request('/stop');
  });

  // Retrocerder
  retroceder.addEventListener('mousedown', function () {
    request('/reverse');
  });

  retroceder.addEventListener('touchstart', function () {
    request('/reverse');
  });

  retroceder.addEventListener('mouseup', function () {
    request('/stop');
  });

  retroceder.addEventListener('touchend', function () {
    request('/stop');
  });

  retroceder.addEventListener('touchcancel', function () {
    request('/stop');
  });

  let isKeyPressed = false;

  window.addEventListener('keypress', function (event) {
    const key = event.code;

    if (isKeyPressed) return;

    if (key === 'KeyW') {
      isKeyPressed = true;
      request('/forward');
    } else if (key === 'KeyA') {
      isKeyPressed = true;
      request('/left');
    } else if (key === 'KeyD') {
      isKeyPressed = true;
      request('/right');
    } else if (key === 'KeyS') {
      isKeyPressed = true;
      request('/reverse');
    }
  });

  window.addEventListener('keyup', function (event) {
    const keys = ['KeyW', 'KeyA', 'KeyD', 'KeyS'];

    if (keys.includes(event.code)) {
      isKeyPressed = false;
      request('/stop');
    }
  });

  let isLetter;

  new JoyStick('joystick-panel', {}, function (stickData) {
    const letter = stickData.cardinalDirection;

    if (isLetter !== 'N' && letter === 'N') {
      request('/forward');
      console.log('forward');
    } else if (isLetter !== 'S' && letter === 'S') {
      request('/reverse');
    } else if (isLetter !== 'E' && letter === 'E') {
      request('/right');
    } else if (isLetter !== 'W' && letter === 'W') {
      request('/left');
    }

    if (isLetter !== 'C' && letter === 'C') {
      request('/stop');
    }
    isLetter = letter;
  });
}

start();