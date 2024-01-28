function startGame() {
    // Redirect to the game page when the "Start Game" button is clicked
    window.location.href = 'game.html';
}
function resetGame() {
    const endgameScreen = document.getElementById('endgame-screen');
    endgameScreen.style.display = 'none';
    
    if (isGameOver) {
        // If the game is over, navigate back to the homepage
        window.location.href = 'index.html';
    } else {
        // Otherwise, reset the game
        poopInterval = setInterval(dropPoop, 2000);
    }
}
