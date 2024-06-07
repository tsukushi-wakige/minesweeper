import { useState } from 'react';
import styles from './index.module.css';
import { title } from 'process';

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

const openTheCell = (bombMap: number[][], userInputs: number[][], x: number, y: number) => {
  if (bombMap[x][y] !== 0 && userInputs[x][y] === 0) {
    userInputs[x][y] = 1;
  }
  if (bombMap[x][y] === 0 && userInputs[x][y] === 0) {
    for (const direction of directions) {
      userInputs[x][y] = 1;
      if (
        bombMap[x + direction[1]] !== undefined &&
        bombMap[x + direction[1]][y + direction[0]] === 0
      ) {
        openTheCell(bombMap, userInputs, x + direction[1], y + direction[0]);
        console.log(userInputs);
      } else {
        // return userInputs;
      }
    }
  }
  return userInputs;
};

const openNumber = (userInputs: number[][], bombMap: number[][]) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (userInputs[i][j] === 1 && bombMap[i][j] === 0) {
        for (const direction of directions) {
          if (userInputs[i + direction[1]] !== undefined) {
            userInputs[i + direction[1]][j + direction[0]] = 1;
          }
        }
      }
    }
  }
  return userInputs;
};

const Home = () => {
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [initialized, setInitialized] = useState<boolean>(false);

  let a = structuredClone(bombMap);

  const clickHandler = (x: number, y: number) => {
    if (!initialized) {
      const newBombMap = putBombs(structuredClone(bombMap), x, y);
      const completeBombMap = putNumbers(newBombMap);
      a = completeBombMap;
      setBombMap(completeBombMap);
      setInitialized(true);
    }
    const newUserInputs = structuredClone(userInputs);
    const newUserInputs2 = openTheCell(a, newUserInputs, x, y);
    const newUserInputs3 = openNumber(newUserInputs2, a);

    setUserInputs(newUserInputs3);
  };

  const rightClickHandler = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    const newUserInputs = structuredClone(userInputs);
    newUserInputs[x][y] = (newUserInputs[x][y] + 2) % 6; // 0->2->3->0のループ
    setUserInputs(newUserInputs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.frameStyle}>
        <div className={styles.boxStyle}>
          <div className={styles.button} />
          <div className={styles.boardStyle}>
            {bombMap.map((row, x) =>
              row.map((cell, y) => (
                <div
                  className={styles.cellBottom}
                  key={`${x}-${y}`}
                  onClick={() => clickHandler(x, y)}
                  onContextMenu={(e) => rightClickHandler(e, x, y)}
                >
                  {userInputs[x][y] === 0 && <div className={styles.cellStyle} />}
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
                  {userInputs[x][y] === 2 && (
                    <div className={styles.cellStyle}>
                      <div
                        className={styles.flagStyle}
                        style={{ backgroundPosition: `-269px 0px` }}
                      />
                    </div>
                  )}
                  {userInputs[x][y] === 4 && (
                    <div className={styles.cellStyle}>
                      <div
                        className={styles.questionMarkStyle}
                        style={{ backgroundPosition: `-240px 0px` }}
                      />
                    </div>
                  )}
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
