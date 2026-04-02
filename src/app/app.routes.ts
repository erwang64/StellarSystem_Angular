import { Routes } from '@angular/router';
import { Default } from './components/system/default/default';
import { ConnectionForm } from './technical/connection-form/connection-form';

export const routes: Routes = [
    {path: '',component: Default},
    {path: "connect" , component: ConnectionForm}
];
