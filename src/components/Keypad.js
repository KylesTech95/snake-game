import { useEffect, React, useState, useCallback } from "react";

export default function Keypad({ setKeypadHidden, keypadHidden, keypadRef }) {
  useEffect(() => {
    let keys = document.querySelectorAll(".k");
    // onload
    window.onload = () => {
      keys.forEach((key, x) => {
        if (x === 0) {
          key.style = `left: 5px;position:absolute;`;
        }
        if (x === 1) {
          key.style = `right: 0px;position:absolute;`;
        }
        if (x === 2) {
          key.style = `left:${
            keypadRef.current.getBoundingClientRect().width / 2.5
          }px;top: -20px;position:absolute;`;
        }
        if (x === 3) {
          key.style = `left:${
            keypadRef.current.getBoundingClientRect().width / 2.5
          }px;bottom: -20px;position:absolute;`;
        }
      });
      // set keypad
      if (document.body.clientWidth <= 950) {
        setKeypadHidden("visible");
      }
    };

    // onresize
    window.onresize = (e) => {
      keys.forEach((key, x) => {
        if (x === 0) {
          key.style = `left: 5px;position:absolute;`;
        }
        if (x === 1) {
          key.style = `right: 0px;position:absolute;`;
        }
        if (x === 2) {
          key.style = `left:${
            keypadRef.current.getBoundingClientRect().width / 2.5
          }px;top: -20px;position:absolute;`;
        }
        if (x === 3) {
          key.style = `left:${
            keypadRef.current.getBoundingClientRect().width / 2.5
          }px;bottom: -20px;position:absolute;`;
        }
      });
      if (document.body.clientWidth <= 950) {
        setKeypadHidden("visible");
      }
    };
  }, []);
  return (
    <>
      <div
        id="keypad-container"
        ref={keypadRef}
        style={{ visibility: keypadHidden }}
      >
        <ul className="keypad-list">
          <div className="k key-left material-symbols-outlined">arrow_back</div>
          <div className="k key-right material-symbols-outlined">
            arrow_forward
          </div>
          <div className="k key-up material-symbols-outlined">arrow_upward</div>
          <div className="k key-down material-symbols-outlined">
            arrow_downward
          </div>
        </ul>
      </div>
    </>
  );
}
