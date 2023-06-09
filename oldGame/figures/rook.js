import Figure, { figureNames } from "/game?=figures/figure.js";
import { colors } from "/game?=resources/colors.js";

export const whiteImg = '/game?=resources/img/whiteRook.png';
export const blackImg = '/game?=resources/img/blackRook.png';

export default class Rook extends Figure {
  isFirstStep = true;

  constructor(color, cell) {
    super(color, cell);
    this.img = color === colors.WHITE ? whiteImg : blackImg;
    this.name = figureNames.ROOK;
  }

  moveFigure() {
    super.moveFigure();
    this.isFirstStep = false;
  }

  canBeat(selectedCell) {
    if (this.cell.isEmptyHorizontal(selectedCell)) {
      return true;
    }
    if (this.cell.isEmptyVertical(selectedCell)) {
      return true;
    }
    return false;
  }

  canMove(selectedCell) {
    if (!super.canMove(selectedCell)) {
      return false;
    }
    if (!this.isMyKingChecked() && (this.canBeat(selectedCell) && !this.isKingWillBeChecked(selectedCell))
      || (this.isMyKingChecked() && this.canBeat(selectedCell) && !this.isKingWillBeChecked(selectedCell) && this.canProtectKing(selectedCell) ))
    {
      return true
    }
    return false;
  }
}