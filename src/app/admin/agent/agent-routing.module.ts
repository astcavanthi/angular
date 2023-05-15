import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAgentComponent } from './all-agent/all-agent.component';
import { AddAgentComponent } from './add-agent/add-agent.component';

const routes: Routes = [
  {
    path: 'all-agent',
    component: AllAgentComponent
  },
  {
    path: 'add-agent',
    component: AddAgentComponent
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule {}

