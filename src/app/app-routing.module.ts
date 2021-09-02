import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardIndexComponent } from '@app/pages/cards/card-index.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { Error404Component } from '@pages/error/error-404.component';
import { Error500Component } from '@pages/error/error-500.component';
import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: CardIndexComponent },
    ]
  },
  { path: 'termos-de-uso', component: TermsOfUseComponent },
  { path: '500', component: Error500Component },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
