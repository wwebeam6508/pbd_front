import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private logo
  constructor(private firestore: AngularFirestore) { }

  async ngOnInit(){
    const items = await this.firestore.collection('logo').valueChanges()
    await items.subscribe(async (item:any) =>{
      this.logo = item[0].image
    })
  }

}
