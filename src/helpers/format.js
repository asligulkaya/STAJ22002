const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const truncateMessage = (message, maxLength) => {
  if (message.length <= maxLength) {
    return message;
  }
  return message.slice(0, maxLength) + "...";
};

const resizeImage = (file, maxWidth, maxHeight, quality) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        console.log(`Original image size: ${width}x${height}`);

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.floor((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.floor((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        console.log(`Resized image size: ${width}x${height}`);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = (error) => {
        reject(error);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export { formatDate, truncateMessage, resizeImage };
