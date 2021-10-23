
export function detect_collision(ball, gobject) {
    //collision with paddle
    let bottom_ball = ball.position.y + ball.size;
    let top_ball = ball.position.y;

    let top_gobject = gobject.position.y;
    let bottom_object = gobject.position.y + gobject.height;
    let left_gobject = gobject.position.x;
    let right_gobject = gobject.position.x + gobject.width;

    if (
    bottom_ball >= top_gobject 
    && top_ball <= bottom_object
    && ball.position.x >= left_gobject 
    && ball.position.x + ball.size <= right_gobject) {
        return true;
    } else {
        return false;
    }//else
}//function