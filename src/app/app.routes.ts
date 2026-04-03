import { Routes } from '@angular/router';
import { Default } from './components/system/default/default';
import { ConnectionForm } from './technical/connection-form/connection-form';
import { AddSystemForm } from './components/system/add-system-form/add-system-form';
import { SystemsPage } from './pages/systems-page/systems-page';
import { EditSystemForm } from './components/system/edit-system-form/edit-system-form';

export const routes: Routes = [
    {path: '',component: Default},
    {path: "connect" , component: ConnectionForm},
    {path: "add-system" , component: AddSystemForm},
    {path: "systems" , component: SystemsPage},
    {path: "edit-system", component: EditSystemForm}
];
