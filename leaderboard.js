class Leaderboard {
    constructor() {
        this.scores = [];
        this.loadScores();
    }

    loadScores() {
        const storedScores = localStorage.getItem('kostyaRunsLeaderboard');
        if (storedScores) {
            this.scores = JSON.parse(storedScores);
        }
    }

    saveScores() {
        localStorage.setItem('kostyaRunsLeaderboard', JSON.stringify(this.scores));
    }

    addScore(player, score) {
        this.scores.push({ player, score });
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, 10); // Keep top 10 scores
        this.saveScores();
    }

    getLeaderboard() {
        return this.scores;
    }

    async fetchScoresFromAPI(apiEndpoint) {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            const apiScores = await response.json();
            this.scores = apiScores;
            this.saveScores();
        } catch (error) {
            console.error('Failed to fetch scores:', error);
        }
    }
}

// Example usage:
// const leaderboard = new Leaderboard();
// leaderboard.addScore('Player1', 100);
// console.log(leaderboard.getLeaderboard());