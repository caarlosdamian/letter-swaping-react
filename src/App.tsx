import { useEffect, useState } from 'react';
import { elements } from './utils';

export default function App() {
  const [state, setState] = useState({
    next: 1,
    current: 0,
    innerWidth: 180,
  });

  useEffect(() => {
    setInterval(() => {
      setState((prev) => {
        console.log('PREVIUS', prev);
        const maxLenght = elements.length - 1;
        const currentItem = prev.next;
        const nextItem = prev.next === maxLenght ? 0 : currentItem + 1;
        const nextwidht = document.querySelector('.words')?.childNodes[
          currentItem
        ] as unknown as { offsetWidth: number };
        return {
          current: currentItem,
          next: nextItem,
          innerWidth: nextwidht.offsetWidth,
        };
      });
    }, 5000);
  }, []);

  console.log(state);

  return (
    <div>
      <h1 className="words-wrapper">
        I want to learn <span className="css">CSS</span> and
        <span
          className="words"
          style={{
            ['--width' as string]: `${state.innerWidth}px`,
            ['--color-bg' as string]: elements[state.current].dataBgColor,
            ['--color-text' as string]: elements[state.current].dataColor,
          }}
        >
          {elements.map((item, index) => (
            <span
              key={item.text}
              className={
                state.current === index
                  ? 'current'
                  : state.next === index
                  ? 'next'
                  : ''
              }
            >
              {item.text}
            </span>
          ))}
        </span>
        .
      </h1>
    </div>
  );
}
