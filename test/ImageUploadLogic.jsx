import { useState, useEffect } from 'react';
import { imageDB } from '../src/Configs/Firebase/firebaseConfig';
import { v4 } from 'uuid';
import { uploadBytes, ref, getDownloadURL, listAll } from 'firebase/storage';

const ImageUploadLogic = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [allImges, setAllImgaes] = useState([{}]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const imageRef = ref(imageDB, `Documents/${v4()}`);
        uploadBytes(imageRef, image)
            .then(() => {
                console.log('Image uploaded successfully.');
                getDownloadURL(imageRef).then((url) => {
                    setImageUrl(url);
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error.message);
            });
    };

    // for show all the images
    // useEffect(() => {
    //     listAll(ref(imageDB, 'Documents')).then(({ items }) => {
    //         items.forEach((val) => {
    //             getDownloadURL(val).then((url) => {
    //                 setAllImgaes((prevUrls) => [...prevUrls, url]);
    //             });
    //         });
    //     });
    // }, []);

    return { imageUrl, allImges, handleImageChange, handleUpload };
};

export default ImageUploadLogic;
