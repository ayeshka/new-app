import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>; // corection to the erro add {static: false}
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string | File;
  usePicker = false; // new property

  constructor(private platform: Platform) { }    // show what are the working divise

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));  // show what are the working divise
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('IOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop')); // show what are the working divise

    if (this.platform.is('mobile') && !this.platform.is('hybrid') || this.platform.is('desktop') ) {
     this.usePicker = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')  ) {    // check whether camera available and usePiker is true
      this.filePickerRef.nativeElement.click();                       // open the fille picker
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        // this.selectedImage  = 'data:image/jpeg;base64,' + image;
        // this.selectedImage = image.base64String;
         this.selectedImage = 'data:image/jpeg;base64,' + image.base64String;  // Base64 string
     
         this.imagePick.emit('data:image/jpeg;base64,' + image.base64String);
        // console.log(this.selectedImage);
      })
      .catch(error => {
        console.log(error);
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }


  onFileChosen(event: Event){
console.log(event);
const pickedFile = (event.target as HTMLInputElement).files[0];
if (!pickedFile) {
  return;
}
const fr = new FileReader();
fr.onload = () => {
  const dataUrl = fr.result.toString();
  this.selectedImage = dataUrl;
  this.imagePick.emit(pickedFile);
  console.log(pickedFile);
}
fr.readAsDataURL(pickedFile);
  }

}
