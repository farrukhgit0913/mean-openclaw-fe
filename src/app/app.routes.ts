import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/demo-selector/demo-selector.component')
        .then(m => m.DemoSelectorComponent)
  },
  {
    path: 'whatsapp',
    loadComponent: () =>
      import('./features/whatsapp-ai/whatsapp-ai.component')
        .then(m => m.WhatsappAiComponent)
  },
  {
    path: 'crm-agent',
    loadComponent: () =>
      import('./features/crm-agent/crm-agent.component')
        .then(m => m.CrmAgentComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];