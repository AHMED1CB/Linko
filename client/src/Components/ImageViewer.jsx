import { useState, useRef, useEffect } from "react";
import "../assets/css/ImageViewer.css";
import { IconButton } from "@mui/material";
import { Close, ZoomIn, ZoomOut } from "@mui/icons-material";

function ImageViewer({ image, setImage }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const overlayRef = useRef(null);

  const handleClose = () => {
    setImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.2));

  const handleDragStart = (x, y) => {
    setDragging(true);
    setStartDrag({ x: x - position.x, y: y - position.y });
  };

  const handleDragMove = (x, y) => {
    if (dragging) {
      setPosition({ x: x - startDrag.x, y: y - startDrag.y });
    }
  };

  const handleDragEnd = () => setDragging(false);

  // Mouse events
  const handleMouseDown = (e) => handleDragStart(e.clientX, e.clientY);
  const handleMouseMove = (e) => handleDragMove(e.clientX, e.clientY);
  const handleMouseUp = () => handleDragEnd();

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };
  const handleTouchEnd = () => handleDragEnd();

  // Wheel zoom with passive=false
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((prev) => Math.min(Math.max(prev + delta, 0.2), 5));
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="image-viewer-container">
      {image && (
        <div
          ref={overlayRef}
          className="image-overlay"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div className="overlay-controls">
            <IconButton className="close-btn" onClick={handleClose}>
              <Close fontSize="large" />
            </IconButton>
            <div className="zoom-buttons">
              <IconButton onClick={zoomIn}>
                <ZoomIn />
              </IconButton>
              <IconButton onClick={zoomOut}>
                <ZoomOut />
              </IconButton>
            </div>
          </div>

          <div
            className="image-wrapper"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <img
              alt="Preview"
              src={image}
              className="image-preview"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: dragging ? "grabbing" : "grab",
                transition: dragging ? "none" : "transform 0.2s ease",
                maxWidth: "100%",
                maxHeight: "100%",
                userSelect: "none",
              }}
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
