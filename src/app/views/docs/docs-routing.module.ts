import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsHomeComponent } from './docs-home/docs-home.component';
import { DocsApikeysComponent } from './docs-apikeys/docs-apikeys.component';

const routes: Routes = [
  { path: "docs-home", component: DocsHomeComponent },
  { path: "api-keys", component: DocsApikeysComponent },
  // { path: "", redirectTo: "docs-home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
