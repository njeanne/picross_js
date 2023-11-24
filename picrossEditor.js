/* eslint-disable no-plusplus */
// la classe
export class PicrossEditor {
  constructor(node) {
    this.name = 'picross editor';
    this.node = node;
  }

  // générer le tableau de solution
  static getCellStateByOrientation(rows, useFirstRowAndFirstCol = true) {
    const cellStateByRow = [];
    const cellStateByCol = [];
    rows.forEach((currentTr, idxRow) => {
      cellStateByRow[idxRow] = [];
      let allTd;
      if (useFirstRowAndFirstCol) {
        allTd = currentTr.querySelectorAll('td');
      } else {
        allTd = currentTr.querySelectorAll('td:not(td:first-of-type)');
      }
      allTd.forEach((currentTd, idxCol) => {
        // utilisation du nullish coalescing assignment ??= qui vérifie
        // si le tableau existe, si il existe rien ne se passe sinon il créé le tableau
        cellStateByCol[idxCol] ??= [];
        if (currentTd.classList.contains('bg-blue')) {
          cellStateByRow[idxRow][idxCol] = true;
          cellStateByCol[idxCol][idxRow] = true;
        } else {
          cellStateByRow[idxRow][idxCol] = false;
          cellStateByCol[idxCol][idxRow] = false;
        }
      });
    });
    return { rowStates: cellStateByRow, colStates: cellStateByCol };
  }

  // extrait le nombre de cellules occupées par ligne ou colonne
  static extractUseCells(cellsByOrientation) {
    const indications = [];
    cellsByOrientation.forEach((currentCellsStateByOrientation) => {
      const indication = [];
      let cellsEnabledNumber = 0;
      currentCellsStateByOrientation.forEach((currentCell) => {
        if (currentCell === true) {
          cellsEnabledNumber++;
        } else {
          if (cellsEnabledNumber !== 0) {
            indication.push(cellsEnabledNumber);
          }
          cellsEnabledNumber = 0;
        }
      });
      if (cellsEnabledNumber !== 0) {
        indication.push(cellsEnabledNumber);
      }
      indications.push(indication);
    });
    return indications;
  }

  // récupérer le nombre de colonnes et de lignes et créer le tableau de jeu
  createPycross(nRow, nCol) {
    const table = document.createElement('table');
    table.id = this.node;
    for (let i = 0; i < nRow; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < nCol; j++) {
        const col = document.createElement('td');
        // switcher en fond bleu des cellules du tableau ou non des cellules si clique
        col.onclick = (ev) => {
          ev.target.classList.toggle('bg-blue');
        };
        row.appendChild(col);
      }
      table.appendChild(row);
    }
    document.getElementById(this.node).replaceWith(table);
  }

  // récupérer la solution
  getSolution(title) {
    const allTr = document.getElementById(this.node).querySelectorAll('tr');
    const states = PicrossEditor.getCellStateByOrientation(allTr);
    const solution = {
      // si 'title,' il affecte la variable title au nom title
      title,
      data: {
        rows: PicrossEditor.extractUseCells(states.rowStates),
        columns: PicrossEditor.extractUseCells(states.colStates),
      },
      size: {
        rows: states.rowStates.length,
        columns: states.colStates.length,
      },
    };
    console.log(solution);
    return solution;
  }
}
