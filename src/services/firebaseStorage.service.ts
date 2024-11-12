import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";

const firebaseApp = getApp();
const storage = getStorage(firebaseApp);


export const addImageFile = async (file: Blob | Uint8Array | ArrayBuffer)=>{
    const imageRefference = ref(storage, 'images');
    await uploadBytes(imageRefference, file).then((snapshot) => {
        console.log('file Uploaded.',snapshot);
      });
}