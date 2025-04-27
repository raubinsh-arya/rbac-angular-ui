import { ColDef } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import { UserProfileResponseType } from '../../models/user.model';
import moment from 'moment';
import { ViewRolesComponent } from './custom-cells/view-roles/view-roles.component';
import { ViewPermissionsComponent } from './custom-cells/view-permissions/view-permissions.component';
import {
  CustomDropDownComponent,
  DropdownRendererParams,
} from '../../shared/components/grid/custom-drop-down/custom-drop-down.component';
import { userStatusTypes } from '../../shared/constants';
import { Store } from '@ngrx/store';
import { updateUserStatus } from '../store/actions/user.action';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class UsersColDefs {
  constructor(
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService
  ) {}

  getColDefs(): ColDef<UserProfileResponseType>[] {
    return [
      {
        field: 'id',
        headerName: 'Id',
        sortable: true,
        editable: false,
        minWidth: 120,
        maxWidth: 120,
        filter: true,
        sort: 'asc',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        valueGetter: ({ data }) => Number(data?.id),
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
      },
      {
        field: 'middleName',
        headerName: 'Middle Name',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        sortable: true,
        editable: false,
        minWidth: 150,
        filter: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        sortable: true,
        editable: false,
        minWidth: 240,
        filter: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
        cellRenderer: CustomDropDownComponent,
        cellRendererParams: {
          values: userStatusTypes,
          displayKey: 'key',
          valueKey: 'value',
          permissions: ['update_user_status'],
        } as DropdownRendererParams,
        onCellValueChanged: ({ newValue, data }) => {
          this.ngxPermission
            .hasPermission(['root_admin', 'update_user_status'])
            .then((has) => {
              if (has)
                this.store.dispatch(
                  updateUserStatus({ id: data.id, status: newValue })
                );
            });
        },
      },
      {
        field: 'id',
        headerName: 'Roles',
        sortable: true,
        editable: false,
        minWidth: 140,
        filter: true,
        cellRenderer: ViewRolesComponent,
      },
      {
        field: 'id',
        headerName: 'Permissions',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        cellRenderer: ViewPermissionsComponent,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        valueFormatter: ({ value }) => moment(value).format('DD-MM-YYYY hh:mm'),
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        sortable: true,
        editable: false,
        minWidth: 170,
        filter: true,
        valueFormatter: ({ value }) => moment(value).format('DD-MM-YYYY hh:mm'),
      },
    ];
  }
}
