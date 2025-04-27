import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { SharedMaterialModule } from '../material.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AppBarMenuComponent } from './components/app-bar/app-bar-menu/app-bar-menu.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AgGridTableComponent } from './components/grid-table/grid-table.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EditableInputComponent } from './components/editable-input/editable-input.component';
import { EditableSelectComponent } from './components/editable-select/editable-select.component';
import { EditableDatePickerComponent } from './components/editable-date-picker/editable-date-picker.component';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { CustomDropDownComponent } from './components/grid/custom-drop-down/custom-drop-down.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FileChooserComponent } from './components/file-chooser/file-chooser.component';

import { HideOnRouteDirective } from './directives/app-hide-on-routes-match.directive';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { SharedViewRolesComponent } from './components/view-roles/view-roles.component';
import { SharedAddRolesComponent } from './components/add-roles-user/add-roles.component';
import { SharedViewPermissionsComponent } from './components/view-permissions/shared-view-permissions.component';
import { SharedAddPermissionsComponent } from './components/add-permissions-user/add-permissions.component';
import { SharedRoleViewPermissionsComponent } from './components/view-role-permissions/shared-view-permissions.component';
import { SharedAddPermissionsRoleComponent } from './components/add-permissions-role/add-permissions-role.component';
import { SharedCreateRoleComponent } from './components/create-role/create-role.component';
import { SharedCreatePermissionComponent } from './components/create-permission/create-permission.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    AppBarMenuComponent,
    NumberFormatterPipe,
    BreadcrumbsComponent,
    AgGridTableComponent,
    EditableInputComponent,
    EditableSelectComponent,
    CustomDropDownComponent,
    EditableDatePickerComponent,
    ConfirmationDialogComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    FileChooserComponent,
    HideOnRouteDirective,
    DateFilterComponent,
    SharedViewRolesComponent,
    SharedAddRolesComponent,
    SharedViewPermissionsComponent,
    SharedAddPermissionsComponent,
    SharedRoleViewPermissionsComponent,
    SharedAddPermissionsRoleComponent,
    SharedCreateRoleComponent,
    SharedCreatePermissionComponent,
    AddUserComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AgGridAngular,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule.forChild([]),
    NgxPermissionsModule.forChild(),
  ],
  exports: [
    FormsModule,
    AvatarComponent,
    AppBarComponent,
    LoadingComponent,
    NumberFormatterPipe,
    ReactiveFormsModule,
    SharedMaterialModule,
    BreadcrumbsComponent,
    AgGridTableComponent,
    EditableInputComponent,
    EditableSelectComponent,
    CustomDropDownComponent,
    EditableDatePickerComponent,
    SharedViewPermissionsComponent,
    SharedAddPermissionsComponent,
    SharedRoleViewPermissionsComponent,
    SharedViewRolesComponent,
    SharedAddRolesComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    FileChooserComponent,
    DateFilterComponent,
    HideOnRouteDirective,
    SharedAddPermissionsRoleComponent,
    SharedCreateRoleComponent,
    SharedCreatePermissionComponent,
    AddUserComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
