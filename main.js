import './style.css';
import { PicrossEditor } from './picrossEditor';
import { PicrossGame } from './picrossGame';

// créer un picrossEditor
const picrossEditor = new PicrossEditor('picross_player');

// récupérer le nombre de colonnes et de lignes et créer le tableau de jeu
document.querySelector('#virgin_picross').onclick = () => {
  const nRow = document.querySelector('#nb_row').value;
  const nCol = document.querySelector('#nb_col').value;
  picrossEditor.createPycross(nRow, nCol);
};

document.querySelector('#generate_picross').onclick = () => {
  const picrossTitle = document.querySelector('#picross_title').value;
  return picrossEditor.getSolution(picrossTitle);
};

// créer un picrossGame
const picrossGame = new PicrossGame('picross_player');
async function displayPicrossAvailable() {
  try {
    const response = await fetch('data/picross_available.json');
    const picrossList = await response.json();
    const divPicross = document.querySelector('#available_picross');
    // détruire l'ancien contenu de la div
    divPicross.innerHTML = '';
    // créer les bouttons de génération des pycross
    picrossList.forEach((picrossElt) => {
      const picrossButton = document.createElement('button');
      divPicross.appendChild(picrossButton);
      picrossButton.textContent = picrossElt.title;
      picrossButton.onclick = () => {
        picrossGame.displayChosenPicross(picrossElt);
      };
    });
  } catch (error) {
    console.error(error);
  }
}

// injecter le picross dans le DOM
document.querySelector('#choose_picross').onclick = () => {
  displayPicrossAvailable();
};
