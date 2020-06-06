import { Component, OnInit, Input  } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit{
  @Input() title: string
  @Input() detail: string

  @Input() id: string
  private images
  private loading
  constructor(private loadingController: LoadingController, private modalCtrl:ModalController, private _lightbox: Lightbox, private firestore: AngularFirestore) { }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.images, index)
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close()
  }

  async closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async ngOnInit () {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1
    })
    await this.loading.present()
    await this.firestore.collection('works').doc(this.id).collection('images').valueChanges({idField: 'id'})
    .subscribe(async (setimage:any) => {
      this.images = await setimage.map((image)=>{
        return {
          src: image.url,
          caption: "",
          thumb: image.url
        }
      })
      await this.loading.onDidDismiss()
    })
  }
}
