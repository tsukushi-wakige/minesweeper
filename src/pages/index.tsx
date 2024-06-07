import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const putNumbers = (bombMap: number[][]) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (bombMap[i][j] === 0) {
        let count = 0;
        for (const direction of directions) {
          if (
            bombMap[i + direction[0]] !== undefined &&
            bombMap[i + direction[0]][j + direction[1]] === -1
          ) {
            count += 1;
          }
        }
        bombMap[i][j] = count;
      }
    }
  }
  return bombMap;
};

const putBombs = (bombMap: number[][], x: number, y: number) => {
  const memoryPosition: number[][] = [];
  while (memoryPosition.length < 10) {
    const memoryOfGRN = generateRandomNumbers();
    if (y !== memoryOfGRN[0] && x !== memoryOfGRN[1]) {
      let isDuplicate = false;
      for (const pos of memoryPosition) {
        if (pos[0] === memoryOfGRN[0] && pos[1] === memoryOfGRN[1]) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate) continue;
      memoryPosition.push(memoryOfGRN);
    }
  }
  for (const position of memoryPosition) {
    bombMap[position[0]][position[1]] = -1;
  }
  return bombMap;
};

function generateRandomNumbers(): number[] {
  const num1 = Math.floor(Math.random() * 9);
  const num2 = Math.floor(Math.random() * 9);
  return [num1, num2];
}

const openTheCell = (userInputs: number[][], x: number, y: number) => {
  userInputs[x][y] = 1;
  return userInputs;
};

const Home = () => {
  const [bombMap, setBombMap] = useState<number[][]>(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(0)),
  );
  const [userInputs, setUserInputs] = useState<number[][]>(
    Array(9)
      .fill(0)
      .map(() => Array(9).fill(0)),
  );
  const [initialized, setInitialized] = useState<boolean>(false);

  const clickHandler = (x: number, y: number) => {
    if (!initialized) {
      const newBombMap = putBombs(structuredClone(bombMap), x, y);
      const completeBombMap = putNumbers(newBombMap);
      setBombMap(completeBombMap);
      setInitialized(true);
    }
    const newUserInputs = structuredClone(userInputs);
    const newUserInputs2 = openTheCell(newUserInputs, x, y);
    setUserInputs(newUserInputs2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.frameStyle}>
        <div className={styles.boardStyle}>
          {bombMap.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {userInputs[x][y] === 1 &&
                  (cell === -1 ? (
                    <div
                      className={styles.bombStyle}
                      style={{ backgroundPosition: `-300px 0px` }}
                    />
                  ) : (
                    cell !== 0 && (
                      <div
                        className={styles.bombStyle}
                        style={{ backgroundPosition: `${-30 * (cell - 1)}px 0px` }}
                      />
                    )
                  ))}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
