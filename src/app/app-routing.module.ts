import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ChatComponent} from "./chat/chat.component";
import {SttComponent} from "./stt/stt.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stt'
  },
  {
    path: 'stt',
    component: SttComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
