import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorksPage } from './works.page';

describe('WorksPage', () => {
  let component: WorksPage;
  let fixture: ComponentFixture<WorksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
