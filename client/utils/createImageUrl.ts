interface Parameters {
  width?: number;
  height?: number;
  quality: number;
  publicId: string;
}

export default function createImageUrl({
  width,
  height,
  quality = 80,
  publicId,
}: Parameters) {
  return `https://res.cloudinary.com/dcbkjtgon/image/upload/${
    width ? `w_${width},` : ""
  }${height ? `h_${height},` : ""}c_fill,q_${quality}/${publicId}.jpg`;
}
