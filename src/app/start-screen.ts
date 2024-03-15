export const generateStartScreen = (): string => {
  return `
    <div class="start-container">
      <h1 class="start-title">english puzzle</h1>
      <div class="start-subtitle">
        RSS Puzzle is an interactive mini-game aimed at enhancing English language skills. The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork. Click on words, collect phrases. Words can be grab and drop. Select tooltips in the menu.
      </div>
      <button class="btn" id="start-btn">Start</button>
    </div>
  `;
};