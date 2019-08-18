import { Component, OnInit } from '@angular/core';


function base64toBlob(base64Data, contentType) {   // Using this utility function, can convert string into file
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }     byteArrays[sliceIndex] = new Uint8Array(bytes);
 }
  return new Blob(byteArrays, { type: contentType });
}  // End of the base64toBlob function

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onImagePicked(imageData: string | File) {
    let imageFile; // this is a variable
    if (typeof imageData === 'string') { // check typeof image data
      // tslint:disable-next-line: max-line-length
      try {
        // tslint:disable-next-line: max-line-length
          imageFile =   base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg'); // pass the image data string to the function and after converting ,it is stored imageFile property
          console.log(imageFile );
    } catch (error) {
        console.log(error);
        return;
      }
     } else {                   // if imageData is a file, not need to converet into the file
     imageFile = imageData;
     console.log(imageFile );
    }
  }  // End of the OnImagePicked function



}
