import { useState, useEffect } from 'react';
import { imageDB } from '../src/Configs/Firebase/firebaseConfig';
import { v4 } from 'uuid';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const ImageUploadLogic = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageChange = (e) => {
        const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
        uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                console.log('Image uploaded successfully.');
                getDownloadURL(imageRef)?.then((url) => {
                    sessionStorage.setItem("imagUrl", url);
                });
            })
            .catch((error) => {
                console.error('Error uploading image:', error.message);
            });
    };

    // const handleUpload = () => {
    //     const imageRef = ref(imageDB, `ImageFiles/${v4()}`);
    //     uploadBytes(imageRef, image)
    //         .then(() => {
    //             console.log('Image uploaded successfully.');
    //             getDownloadURL(imageRef).then((url) => {
    //                 setImageUrl(url);
    //                 sessionStorage.setItem("imagUrl", url);
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error uploading image:', error.message);
    //         });
    // };

    // useEffect(() => {
    //     handleUpload();
    // }, [])

    //for show all the images
    // useEffect(() => {
    //     listAll(ref(imageDB, 'ImageFiles')).then(({ items }) => {
    //       items.forEach((val) => {
    //         getDownloadURL(val).then((url) => {
    //           setImageUrl((prevUrls) => [...prevUrls, url]);
    //         });
    //       });
    //     });
    //   }, []);

    return {
        imageUrl, handleImageChange,
        // handleUpload
    };
};

export default ImageUploadLogic;
