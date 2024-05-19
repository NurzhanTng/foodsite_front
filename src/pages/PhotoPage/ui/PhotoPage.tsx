import React, { useRef, useEffect, useState } from "react";

const PhotoPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
        setError("Error accessing the camera: " + err);
      }
    };

    initCamera();
  }, []);

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
        const dataURL = canvasRef.current.toDataURL("image/png");
        setPhoto(dataURL);
      }
    }
  };

  return (
    <div className="text-center">
      <h1>Access Camera and Take Photo</h1>
      <p className="text-error">{error}</p>
      <video
        className="mx-auto my-4 bg-white"
        ref={videoRef}
        width="320"
        height="240"
        autoPlay
      ></video>
      <button onClick={takeSnapshot}>Snap Photo</button>
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      ></canvas>
      {photo && (
        <img src={photo} alt="The screen capture will appear in this box." />
      )}
    </div>
  );
};

export default PhotoPage;
