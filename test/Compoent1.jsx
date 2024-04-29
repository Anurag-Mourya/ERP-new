import React from 'react';
import ImageUploadLogic from './ImageUploadLogic';

const Compoent1 = () => {
  const { imageUrl, handleImageChange, handleUpload } = ImageUploadLogic();
  const imgURl = sessionStorage.getItem("imagUrl")

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {/* <button onClick={handleUpload}>Upload Image</button> */}
      {imgURl && <img src={imgURl} alt="" height={500} width={500} />}
    </div>
  );
};

export default Compoent1;
