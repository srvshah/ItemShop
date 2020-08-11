
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSliderModule} from '@angular/material/slider'
import {MatListModule} from '@angular/material/list'

@NgModule({
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TextFieldModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
  ]
})
export class MaterialModule { }
