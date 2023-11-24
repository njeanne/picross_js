import { describe, expect, test } from 'vitest';
import { PicrossEditor } from './picrossEditor';

describe('picrossEditor', () => {
  test("instanciation de l'éditeur", () => {
    const editor = new PicrossEditor('picross_player');
    expect(editor).toBeDefined();
  });

  test('création de picross', () => {
    // création de la table expected
    const table = document.createElement('table');
    table.id = 'picross_player';
    document.body.appendChild(table);
    // création de la table picross
    const editor = new PicrossEditor('picross_player');
    editor.createPycross(3, 4);
    // le test
    expect(document.getElementById('picross_player')).toMatchSnapshot();
    // on nettoie le DOM en enlevant la table expected
    document.body.removeChild(document.getElementById('picross_player'));
  });

  test('modification du picross en cliquant sur les cellules', () => {
    // création de la table expected
    const table = document.createElement('table');
    table.id = 'picross_player';
    document.body.appendChild(table);
    // création de la table picross
    const editor = new PicrossEditor('picross_player');
    editor.createPycross(3, 4);
    // on créé des cliques sur les cellules pour transformer le fond en bleu
    document.querySelector('table tr td').click();
    document.querySelector('table tr:nth-of-type(2) td:nth-of-type(3)').click();
    // le test
    expect(document.getElementById('picross_player')).toMatchSnapshot();
    // on nettoie le DOM en enlevant la table expected
    document.body.removeChild(document.getElementById('picross_player'));
  });
});
