import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import drawWheelSlice from "./drawWheelSlice";
import deg2rad from "./deg2rad";

function getRandomColor() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

const Wheel = (
  {
    slices,
    slicesT,
    size = window.innerWidth,
    strokeColor = "#FFF",
    strokeWidth = 4,
  },
  ref
) => {
  const [finalDeg, setFinalDeg] = useState(0);
  const [result, setresult] = useState([]);
  const canvasRef = useRef(null);
  const slicesCount = slices.length;
  const sliceDeg = 360 / slicesCount;
  const center = size / 2; // center - radius
  const [isSpinning, setIsSpinning] = useState(false);
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let deg = 0;

    slicesT.forEach((text) => {
      drawWheelSlice(ctx, {
        deg,
        color: getRandomColor(),
        sliceDeg,
        center,
        strokeWidth,
        strokeColor,
        text,
        size,
      });

      deg += sliceDeg;
    });
  });

  const spin = useCallback(
    (elements) => {
      const totalElements = elements.length;
      const calculateAngle = (index, total) => (index / total) * 360;

      const randomValue = Math.random(); // Số ngẫu nhiên từ 0 đến 1
      const totalProbability = elements.reduce(
        (sum, element) => sum + element.probability,
        0
      );

      let currentProbability = 0;
      let selectedElement = null;

      elements.forEach((element, index) => {
        const probability = element.probability / totalProbability;
        currentProbability += probability;

        if (randomValue <= currentProbability && !selectedElement) {
          selectedElement = element;
        }
      });
      console.log(slices);
      let selectedElementIndex = slices.indexOf(selectedElement);
      // Gửi thông điệp hoặc xử lý kết quả theo ý muốn
      const targetAngle = (selectedElementIndex * sliceDeg + 90) % 360;
      setresult([...result, selectedElementIndex]);
      // const min = finalDeg + 500;
      // const max = finalDeg + 1500;
      //const resultDeg1 = Math.floor(Math.random() * (max - min + 1)) + min;

      // let index = Math.floor(
      //   ((360 - resultDeg1 - 90) % 360) / (360 / elements.length)
      // );
      // const calculateResultDeg = (
      //   selectedElementIndex,
      //   elementsLength,
      //   min,
      //   max
      // ) => {
      //   const sliceDeg = 360 / elementsLength;
      //   const targetAngle = (selectedElementIndex * sliceDeg + 90) % 360;
      //   const offset = targetAngle - 360; // Offset to ensure the correct range
      //   const resultDeg =
      //     Math.floor(Math.random() * (max - min + 1)) + min + offset;
      //   return resultDeg % 360; // Ensure resultDeg is in the range [0, 360)
      // };

      const calculateResultDeg1 = (selectedElementIndex, elementsLength) => {
        const sliceDeg = 360 / elementsLength;
        const targetAngle = (selectedElementIndex * sliceDeg + 90) % 360;
        const resultDeg1 = (360 - selectedElementIndex * sliceDeg - 90) % 360;
        return resultDeg1;
      };
      const resultDeg1 = calculateResultDeg1(
        selectedElementIndex,
        elements.length
      );
      // const resultDeg = calculateResultDeg(
      //   selectedElementIndex,
      //   elements.length,
      //   min,
      //   max
      // );
      //index = (slicesCount + index) % slicesCount; // fix if negative index
      console.log(elements[selectedElementIndex]);
      //console.log(selectedElementIndex);
      setFinalDeg(resultDeg1 + 1050);

      return elements[selectedElementIndex];
    },
    [finalDeg, sliceDeg, slices, slicesCount]
  );
  useImperativeHandle(ref, () => ({ spin }), [spin]);

  return (
    <div>
      <div
        style={{
          overflow: "hidden",
          width: size,
          height: size,
          position: "relative",
        }}
        onClick={spin}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            zIndex: 1,
          }}
        >
          |
        </div>
        <canvas
          style={{
            transform: `rotate(${finalDeg}deg)`,
            transition: "transform 4s ease 0s",
          }}
          ref={canvasRef}
          width={size}
          height={size}
          onTransitionEnd={(e) => {
            setFinalDeg(0);
          }}
        />
      </div>
    </div>
  );
};

export default forwardRef(Wheel);
