import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadabilityComponent } from './pages/readability/readability.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { SubstitutionComponent } from './pages/substitution/substitution.component';
import { ChoiceComponent } from './pages/choice/choice.component';
import { SignatureComponent } from './pages/signature/signature.component';
import { ColorBarComponent } from './bars/color-bar/color-bar.component';


const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'projects/reading-level', component: ReadabilityComponent },
  { path: 'projects/substitution-cipher', component: SubstitutionComponent },
  { path: 'projects/preference-poll', component: ChoiceComponent },
  { path: 'projects/signature-generator', component: SignatureComponent },
  { path: 'projects/color-palette', component: ColorBarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
