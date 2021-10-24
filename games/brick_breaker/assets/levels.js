import Brick from "./brick.js"

export function build_level(game, level) {
    let bricks = [];
    if (game.gamestate == 5) return;
    level.forEach((row, row_num) => {
        row.forEach((brick, brick_num) => {
            if (brick == 1) {
                let position = {
                    x: game.brick.width*brick_num,
                    y: 50 + game.brick.height * row_num
                }
                bricks.push(new Brick(game, position))
            }
        });
    });
    return bricks;
}

export const level1 = [
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
]
export const level2 = [
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
]