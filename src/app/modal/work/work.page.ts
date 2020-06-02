import { Component, OnInit, Input  } from '@angular/core';
import * as $ from 'jquery';
import { Lightbox } from 'ngx-lightbox';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
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
  constructor(private modalCtrl:ModalController, private _lightbox: Lightbox, private firestore: AngularFirestore) { }

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
    await this.firestore.collection('works').doc(this.id).collection('images').valueChanges({idField: 'id'})
    .subscribe(async (setimage:any) => {
      this.images = await setimage.map((image)=>{
        return {
          src: image.url,
          caption: "",
          thumb: image.url
        }
      })
    })
  }
}
