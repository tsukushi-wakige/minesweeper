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
// const putNumbers
const putBombs = (bombMap: number[][], x: number, y: number) => {
  const memoryPosition: number[][] = [];
  while (memoryPosition.length < 10) {
    const memoryOfGRN = generateRandomNumbers();
    if (y !== memoryOfGRN[0] && x !== memoryOfGRN[1]) {
      let x = false;
      for (const sum of memoryPosition) {
        if (sum[0] === memoryOfGRN[0] && sum[1] === memoryOfGRN[1]) {
          x = true;
          break;
        }
      }
      if (x) continue;
      memoryPosition.push(memoryOfGRN);
      console.log(memoryPosition);
    }
  }
  for (const position of memoryPosition) {
    bombMap[position[0]][position[1]] = -1;
  }
  return bombMap;
};
function generateRandomNumbers(): number[] {
  // 0〜8の範囲で乱数を生成
  const num1 = Math.floor(Math.random() * 9); // 0から8までの数を返す
  const num2 = Math.floor(Math.random() * 9); // 0から8までの数を返す

  // 生成した乱数をリストにして返す
  return [num1, num2];
}
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
  const clickHandler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    const newBombMap2 = putBombs(newBombMap, x, y);
    setBombMap(newBombMap2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {bombMap.map((row, y) =>
          row.map((circumStance, x) => (
            <div className={styles.cellStyle} key={`${x}-{y}`} onClick={() => clickHandler(x, y)}>
              {circumStance === -1 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-300px 0px` }} />
              )}
              {circumStance === 1 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `0px 0px` }} />
              )}
              {circumStance === 2 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-30px 0px` }} />
              )}
              {circumStance === 3 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-60px 0px` }} />
              )}
              {circumStance === 4 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-90px 0px` }} />
              )}
              {circumStance === 5 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-120px 0px` }} />
              )}
              {circumStance === 6 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-150px 0px` }} />
              )}
              {circumStance === 7 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-180px 0px` }} />
              )}
              {circumStance === 8 && (
                <div className={styles.bombStyle} style={{ backgroundPosition: `-210px 0px` }} />
              )}
            </div>
          )),
        )}
      </div>

      {/* <button onClick={() => setSamplePos((p) => (p + 1) % 14)}>sample</button> */}
    </div>
  );
};

export default Home;
