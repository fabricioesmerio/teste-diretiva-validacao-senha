import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordValidationDirective } from '../diretivas/password-validation.directive';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PasswordValidationDirective,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
