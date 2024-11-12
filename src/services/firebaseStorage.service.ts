import { getStorage, ref, uploadBytes,getDownloadURL, StorageReference ,deleteObject} from "firebase/storage";
import { getApp } from "firebase/app";

const firebaseApp = getApp();
const storage = getStorage(firebaseApp);


export const addFile = async (file: Blob | Uint8Array | ArrayBuffer):Promise<StorageReference|null>=>{
    const timestamp = new Date().getTime();
    const fileName = `image_${timestamp}.png`;
    const fileRefference = ref(storage, `images/${fileName}`);
    const reference = await uploadBytes(fileRefference, file).then((snapshot) => {
        console.log('file Uploaded.');
        return snapshot.ref;
      })
      .catch((error) => {
        console.error('Error uploading file: ', error);
        return null;
      });
    return reference;
}


export const deleteFile = async (fileRef:StorageReference):Promise<boolean>=>{
    await deleteObject(fileRef).then(() => {
        console.log('File deleted');
        return true;
      }).catch((error) => {
        console.error('Error deleting file: ', error);
        return false;
      });
    return false;
}