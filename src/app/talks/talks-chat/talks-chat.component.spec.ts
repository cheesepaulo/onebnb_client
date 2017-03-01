/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TalksChatComponent } from './talks-chat.component';

describe('TalksChatComponent', () => {
  let component: TalksChatComponent;
  let fixture: ComponentFixture<TalksChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalksChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalksChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
