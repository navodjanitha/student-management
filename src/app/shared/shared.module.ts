import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild([])],
})
export class SharedModule {}
