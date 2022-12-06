import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex.component';

const routes: Routes = [
  {
    path: '',
    component: PokedexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PokedexComponent],
})
export class PokedexModule { }
