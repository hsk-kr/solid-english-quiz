import { PlayHistory } from "../types/quiz";

const STORAGE_PLAY_HISTORY = "STORAGE_PLAY_HISTORY";

export const getPlayHistory = (title: string): number => {
  const historyMap = JSON.parse(
    localStorage.getItem(STORAGE_PLAY_HISTORY) || "{}"
  ) as PlayHistory;

  let score = 0;
  try {
    score = historyMap[title] || 0;
  } catch (e) {
    console.error(e);
    localStorage.removeITem(STORAGE_PLAY_HISTORY);
  }

  return score;
};

export const savePlayHistory = (title: string, score: number) => {
  const historyMap = JSON.parse(
    localStorage.getItem(STORAGE_PLAY_HISTORY) || "{}"
  ) as PlayHistory;

  try {
    historyMap[title] = score;
    localStorage.setItem(STORAGE_PLAY_HISTORY, JSON.stringify(historyMap));
  } catch (e) {
    console.error(e);
    localStorage.setItem(
      STORAGE_PLAY_HISTORY,
      JSON.stringify({
        [title]: score,
      })
    );
  }
};

export const evalScore = (score: number): 1 | 2 | 3 => {
  if (score >= 1) return 1;
  else if (score >= 0.6) return 2;
  else return 3;
};
