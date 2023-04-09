import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadabilityComponent } from '../pages/readability/readability.component';
import { SubstitutionComponent } from '../pages/substitution/substitution.component';
import { ChoiceComponent } from '../pages/choice/choice.component';
import { SignatureComponent } from '../pages/signature/signature.component';



const routes: Routes = [
  { path: 'projects/reading-level', component: ReadabilityComponent },
  { path: 'projects/substitution-cipher', component: SubstitutionComponent },
  { path: 'projects/preference-poll', component: ChoiceComponent },
  { path: 'projects/signature-generator', component: SignatureComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FragmentsRoutingModule { }
