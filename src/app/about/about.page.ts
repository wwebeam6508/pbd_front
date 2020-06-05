import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private imageone
  private imagetwo
  private detail

  constructor(private firestore: AngularFirestore) { }

  async ngOnInit() {
    await this.firestore.collection('about').valueChanges()
    .subscribe(async (set:any) => {
      this.imageone = set[0].imageone
      this.imagetwo = set[0].imagetwo
      this.detail = set[0].detail
    })
  }

}
