import classNames from "classnames/bind";
import styles from "./App.module.scss";
const cx = classNames.bind(styles);
function Settings() {
  return (
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
                slices.forEach((item, index1) => {
                  if (index == index1) {
                    item.probability = parseInt(e.target.value) / 100;
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
          console.log(newarr);
          const result = wheelRef.current.spin(newarr);
        }}
      >
        Xác nhận
      </div>
    </div>
  );
}

export default Settings;
