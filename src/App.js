import Wheel from "./Wheel";
import styles from "./App.module.scss";
import classNames from "classnames/bind";
import React, { useRef, useState, useCallback, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./store/Context";
const cx = classNames.bind(styles);
function App() {
  const [newarr, setnewarr] = useState([]);
  const initialState = [
    { name: "Ali", probability: 0 },
    { name: "Beatriz", probability: 0 },
    { name: "Charles", probability: 0 },
    { name: "Diya", probability: 0 },
    { name: "Eric", probability: 0 },
  ];
  const [slices, setSlices] = useState(initialState);
  const countRef = useRef(slices.length);
  const wheelRef = useRef(null);
  const { result, setresult } = useContext(Context);
  const { msbox, setmsbox } = useContext(Context);
  const handleSpin = useCallback(() => {
    const result = wheelRef.current.spin();
    console.log("From App: ", result);
  }, [wheelRef]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value != null) {
      setSlices([...slices, { name: e.target.value, probability: 0 }]);
    }
  };
  // const handleClick = useCallback(
  //   (item) => {
  //     setnewarr([...newarr, item]);
  //   },
  //   [newarr]
  // );
  //console.log(newarr);
  return (
    <div className={cx("container")}>
      <div className={cx("containerSpin")}>
        <Wheel
          slicesT={slices.map((item1) => item1.name)}
          ref={wheelRef}
          slices={slices}
          size={400}
        />
      </div>
      <div className={cx("containerAddItem")}>
        <h2>Thêm item</h2>
        <input
          onKeyDown={handleKeyDown}
          className={cx("addItemInput")}
          type="text"
        />
        <div className={cx("listItem")}>
          {slices.map((item, index) => (
            <div className={cx("item")} key={index}>
              {item.name}
              <div
                onClick={() => {
                  const a = slices.filter((item1) => item1.name != item.name);
                  setSlices(a);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          ))}
        </div>
        <div className={cx("listItem")}>
          <h2> muốn đặt phần trăm item nào</h2>
          {slices.map((item, index) => (
            <div className={cx("item")} key={index}>
              {item.name}
              <input
                key={index}
                type="text"
                placeholder={item.probability}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    slices.forEach((item1, index1) => {
                      if (index == index1) {
                        item1.probability = parseInt(e.target.value) / 100;
                        setnewarr([...newarr, slices[index1]]);
                      }
                    });
                  }
                }}
              />
            </div>
          ))}
          <div
            onClick={() => {
              //console.log(newarr);
              const result = wheelRef.current.spin(newarr);
            }}
          >
            Xác nhận
          </div>
        </div>
      </div>
      <div>
        <h2>
          Kết quả: {result.length > 1 ? result[result.length - 1].name : ""}
        </h2>
        {/* <div>
            <span
              onClick={() => {
                setmsbox(false);
              }}
            >
              Đóng
            </span>
          </div> */}
      </div>
    </div>
  );
}

export default App;
