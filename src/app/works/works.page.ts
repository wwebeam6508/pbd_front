import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';
import { ModalController } from '@ionic/angular';
import { WorkPage } from '../modal/work/work.page';
@Component({
  selector: 'app-works',
  templateUrl: './works.page.html',
  styleUrls: ['./works.page.scss'],
})
export class WorksPage implements OnInit {

  private _albums  = [];
  constructor(public modalController: ModalController, private firestore: AngularFirestore) {}

  async ngOnInit() {
    await this.firestore.collection('works').valueChanges({idField: 'id'})
    .subscribe(async (item:any) =>{ 
      this._albums = []
      await item.forEach(async work => {
        await this._albums.push(work)
      })
      await this.freewall(this._albums)
    })
  }

  async workModal(set) {
    const modal = await this.modalController.create({
      component: WorkPage,
      cssClass: 'customModal',
      componentProps: {
        'title': set.title,
        'detail': set.detail,
        'id': set.id
      }
    });
    return await modal.present();
  }
  
  async freewall(set){
    let Freewall:any = "freewall" in window ? window['freewall'] : '';
    let temp = "<div id='{id}' class='cell' style='width:{width}px;height:{height}px;background-image: url({img});background-size: cover;background-position: center;' >"
      +"<div class='cell-item' >"
        + "<div class='cover'><h5>{title}</h5></div>"
      + "</div>"
    + "</div>"
    let w = 1, html = '';
    const random_item = await this.shuffle(set)
    const name_id = 'Rooms'
    for (let i = 0; i < random_item.length; ++i) {
      w = 300 +  200 * Math.random() << 0;
      html += temp.replace(/\{id\}/g, `${name_id}${i}`).replace(/\{height\}/g, '350').replace(/\{width\}/g, w.toString()).replace(/\{img\}/g, random_item[i].image).replace(/\{title\}/g, random_item[i].title)
    }
    $("#freewall").html(html);
    for (let i = 0; i < random_item.length; ++i) {
      $(`#${name_id}${i}`).click(() => {
        this.workModal(this._albums[i])
      })
    }
    let wall = new Freewall("#freewall");
    wall.reset({
      selector: '.cell',
      animate: true,
      cellW: 35,
      cellH: 150,
      onResize: function() {
        wall.fitWidth();
      }
    });
    wall.fitWidth();
    // for scroll bar appear;
    $(window).trigger("resize");
    
    const css_cell = {
      "z-index":1,
      "cursor": "pointer"
    }
    const css_cell_item = {
      "background-color": "black",
      "position": "absolute",
      "top": 0,
      "left": 0,
      "width": "100%",
      "height": "100%",
      "z-index":2,
      "opacity": "0"
    }
    const css_cover = {
      "color" : "white",
      "opacity": "0",
      "position": "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "z-index":3
    }
    $(".cover").css(css_cover)
    $(".cell").css(css_cell);
    $(".cell-item").css(css_cell_item)
    $(".cell").hover(function() {
      $(this).children(".cell-item").css({
        "opacity": "0.7",
        "transition": "opacity 0.5s"
      })
      $(this).children(".cell-item").children(".cover").css({
        "opacity": "1",
        "transition": "opacity 0.5s"
      })
    }, function(){
      $(this).children(".cell-item").css({
        "opacity": "0",
        "transition": "opacity 0.5s"
      })
      $(this).children(".cell-item").children(".cover").css({
        "opacity": "0",
        "transition": "opacity 0.5s"
      })
    });
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
