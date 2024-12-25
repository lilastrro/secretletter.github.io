const evilButton = document.getElementById('evil-button');
const OFFSET = 100;

evilButton.addEventListener('click', () => {
  moveButton();
});

async function moveButton() {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = evilButton.getBoundingClientRect();

  let left = Math.random() * (windowBox.width - buttonBox.width - OFFSET * 2) + OFFSET;
  let top = Math.random() * (windowBox.height - buttonBox.height - OFFSET * 2) + OFFSET;

  evilButton.style.position = 'absolute';
  evilButton.style.left = `${left}px`;
  evilButton.style.top = `${top}px`;
}
