import React, { useState } from 'react';

function Canvas() {
  const [images, setImages] = useState([]); // State to store images

  const handleImageClick = (imageId) => {
    // Filter out the clicked image from the state
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
  };

  return (
    <div className="canvas">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt="Draggable Image"
          draggable="true"
          onDragStart={(e) => e.preventDefault()} // Disable default drag behavior
          style={{
            transform: `translate(${image.x}px, ${image.y}px) scale(${image.scale})`,
          }}
          onClick={() => handleImageClick(image.id)} // Delete on click
        />
      ))}
    </div>
  );
}

export default Canvas;
