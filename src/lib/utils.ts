export const shuffleArray = <T extends unknown>(list: T[]): T[] => {
  const newList = [...list];

  for (let i = 0; i < newList.length; i++) {
    const randIdx = Math.floor(Math.random() * list.length);

    const tmp = newList[i];
    newList[i] = newList[randIdx];
    newList[randIdx] = tmp;
  }

  return newList;
};
