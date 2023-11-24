/* eslint-disable comma-dangle */
/* eslint-disable no-plusplus */
import { PicrossEditor } from './picrossEditor';

function concatenateCellsAsText(dataTable) {
  return `${dataTable.rows.join('-')} ${dataTable.columns.join('-')}`;
}

function checkVictory(expectedTable, currentTable) {
  const expected = concatenateCellsAsText(expectedTable);
  const playerPicross = PicrossEditor.getCellStateByOrientation(
    currentTable.querySelectorAll('tr:not(tr:first-of-type)'),
    false
  );
  const current = concatenateCellsAsText({
    rows: PicrossEditor.extractUseCells(playerPicross.rowStates),
    columns: PicrossEditor.extractUseCells(playerPicross.colStates),
  });
  return expected === current;
}

// la classe hérite de PicrossEditor
export class PicrossGame extends PicrossEditor {
  displayChosenPicross(picrossData) {
    const tableForPicross = document.createElement('table');
    tableForPicross.id = 'picross_player';
    for (let i = 0; i < picrossData.size.rows + 1; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < picrossData.size.columns + 1; j++) {
        const cell = document.createElement('td');
        // si 1ere ligne remplir première ligne avec les instructions de remplissage
        if (i === 0 && j !== 0) {
          cell.textContent = picrossData.data.columns[j - 1].join(' ');
        } else {
          // sinon switcher en fond bleu des cellules du tableau ou non des cellules si clique
          cell.onclick = (ev) => {
            ev.target.classList.toggle('bg-blue');
            const comparison = checkVictory(picrossData.data, tableForPicross);
            console.log(`Result of comparison: ${comparison}`);
            if (comparison) {
              alert('Bravo!!');
            }
          };
        }
        // si 1ere colonne remplir la première colonne avec les instructions de remplissage
        if (j === 0 && i !== 0) {
          cell.textContent = picrossData.data.rows[i - 1].join(' ');
        }
        row.appendChild(cell);
      }
      tableForPicross.appendChild(row);
    }
    document.getElementById(this.node).replaceWith(tableForPicross);
  }
}
