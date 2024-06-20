document.addEventListener('DOMContentLoaded', () => {
    const games = document.querySelectorAll('.game');

    games.forEach(game => {
        game.addEventListener('click', () => {
            const url = game.getAttribute('data-url');
            window.location.href = url;
        });
    });
});