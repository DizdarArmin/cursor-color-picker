import { useState, useEffect } from "react";
export default function Color({ position, isActive }) {
  let width = window.innerWidth - 1;
  let height = window.innerHeight - 1;

  let unitOfWidth = width / 255;
  let unitOfHeight = height / 255;
  let unitFromRight = (width - position.x) / 255;

  const [hex, setHex] = useState();
  const [copied, setCopied] = useState("");

  const copy = () => {
    navigator.clipboard.writeText(hex);
    copiedMessage();
  };

  const rgbToHex = (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    return "#" + r + g + b;
  };

  let color = {
    r: Math.floor(position.x / unitOfWidth),
    g: Math.floor(position.y / unitOfHeight),
    b: Math.floor(position.x / unitFromRight),
  };

  const handleChange = () => {
    let hexColor = rgbToHex(color.r, color.g, color.b);
    console.log(JSON.stringify(color));
    setHex(hexColor);
  };

  useEffect(() => handleChange(), [position]);

  const style = {
    backgroundColor: `${hex}`,
  };

  const copiedMessage = () => {
    setCopied("Copied to clipboard: " + hex);
  };

  return (
    <div className="App" style={style} onClick={() => copy()}>
      <div className="copied">{copied}</div>
      <div className="block">
        <h1 className="white-text-shadow title">{hex}</h1>
        <br />
        <p className="white-text-shadow subtitle">Click to copy!</p>
      </div>
    </div>
  );
}
