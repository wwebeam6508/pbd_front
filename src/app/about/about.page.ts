import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private imageone
  private imagetwo
  private detail
  private loading
  constructor(private loadingController: LoadingController,private firestore: AngularFirestore) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1
    })
    await this.loading.present()
    await this.firestore.collection('about').valueChanges()
    .subscribe(async (set:any) => {
      this.imageone = set[0].imageone
      this.imagetwo = set[0].imagetwo
      this.detail = set[0].detail
      await this.loading.onDidDismiss()
    })
  }

}
