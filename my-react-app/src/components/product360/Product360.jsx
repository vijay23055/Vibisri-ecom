import React, { useEffect, useRef, useState } from "react";

export default function ProductSpin360() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const currentFrame = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  // List of image URLs (your 9 frames)
  const frameUrls = [
    "https://iili.io/KyrCN87.png",
    "https://iili.io/KyrCe99.png",
    "https://iili.io/KyrCkue.png",
    "https://iili.io/KyrCvwu.png",
    "https://iili.io/KyrC8Zb.png",
    "https://iili.io/KyrCUnj.png",
    "https://iili.io/KyrCgMx.png",
    "https://iili.io/KyrCr6Q.png",
    "https://iili.io/KyrC6FV.png",
  ];

  // Load all images
  useEffect(() => {
    const loaded = [];
    frameUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded[index] = img;
        if (loaded.length === frameUrls.length) {
          setImages(loaded);
          drawFrame(0, loaded);
        }
      };
    });
  }, []);

  // Draw selected frame on canvas
  const drawFrame = (idx, imgs) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgs[idx], 0, 0, canvas.width, canvas.height);
  };

  // Mouse/touch handling
  const onDrag = (clientX) => {
    const diff = clientX - startX.current;

    if (Math.abs(diff) > 5) {
      if (diff > 0) {
        currentFrame.current =
          (currentFrame.current - 1 + frameUrls.length) % frameUrls.length;
      } else {
        currentFrame.current =
          (currentFrame.current + 1) % frameUrls.length;
      }
      drawFrame(currentFrame.current, images);
      startX.current = clientX;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="select-none cursor-grab"

      onMouseDown={(e) => {
        dragging.current = true;
        startX.current = e.clientX;
      }}
      onMouseMove={(e) => {
        if (dragging.current) onDrag(e.clientX);
      }}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}

      onTouchStart={(e) => {
        dragging.current = true;
        startX.current = e.touches[0].clientX;
      }}
      onTouchMove={(e) => {
        if (dragging.current) onDrag(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        dragging.current = false;
      }}
    />
  );
}
