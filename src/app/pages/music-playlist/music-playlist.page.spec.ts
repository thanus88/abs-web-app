import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlaylistPage } from './music-playlist.page';

describe('MusicPlaylistPage', () => {
  let component: MusicPlaylistPage;
  let fixture: ComponentFixture<MusicPlaylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPlaylistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
