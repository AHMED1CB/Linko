import { useState, useRef } from "react";
import "../assets/css/ImageViewer.css";
import { IconButton, Button } from "@mui/material";
import { Close, ZoomIn, ZoomOut } from "@mui/icons-material";

function ImageViewer({ image, setImage }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const handleClose = () => {
    setImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.2));

  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.2), 5));
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - startDrag.x, y: e.clientY - startDrag.y });
    }
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="image-viewer-container">
      {image && (
        <div
          className="image-overlay"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="overlay-controls">
            <IconButton className="close-btn" onClick={handleClose}>
              <Close fontSize="large" />
            </IconButton>
            <div className="zoom-buttons">
              <IconButton onClick={zoomIn}>
                <ZoomIn variant="contained" />
              </IconButton>
              <IconButton onClick={zoomOut}>
                <ZoomOut variant="contained" />
              </IconButton>
            </div>
          </div>

          <div
            className="image-wrapper"
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
          >
            <img
              alt="Preview"
              src={image}
              className="image-preview"
              style={{
                scale: `${scale}`,
                transform: `translate(${position.x}px , ${position.y}px)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
