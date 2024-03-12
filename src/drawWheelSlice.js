import deg2rad from "./deg2rad";

const drawWheelSliceShape = (
  ctx,
  { deg, color, sliceDeg, center, strokeWidth, strokeColor }
) => {
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(
    center, // centerX
    center, // centerY
    center - strokeWidth / 2, // radius
    deg2rad(deg), // startAngle
    deg2rad(deg + sliceDeg) // endAngle
  );
  ctx.lineTo(center, center);

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.fillStyle = color;

  ctx.fill();
  ctx.stroke();
};

const drawWheelText = (ctx, { deg, sliceDeg, center, text, size }) => {
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg + sliceDeg / 2));

  ctx.textAlign = "center";
  ctx.fillStyle = "#FFF";
  ctx.font = "bold 24px arial";

  ctx.fillText(text, size / 4, 7);
  ctx.restore();
};

const drawWheelSlice = (ctx, options) => {
  drawWheelSliceShape(ctx, options);
  ctx.save();
  drawWheelText(ctx, options);
};

export default drawWheelSlice;
