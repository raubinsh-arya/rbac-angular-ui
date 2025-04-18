import { Component, inject } from '@angular/core';
import { ColDef, IRowNode } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import {
  addPermissionsToUser,
  fetchPermissions,
} from '../../../users/store/actions/user.action';
import { RoleType } from '../../../models/role.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { AddPermissionsColDefs } from './col-def.service';
import { PermissionType } from '../../../models/permission.model';
import { selectPermissions } from '../../../users/store/selectors/permissions.selector';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions.component.html',
  styleUrl: './add-permissions.component.scss',
})
export class SharedAddPermissionsComponent {
  colDefs!: ColDef[];
  rowData!: RoleType[];
  public readonly dialogData: { selectedData: Array<string>; userId: string } =
    inject(MAT_DIALOG_DATA);
  public selectedRowIds: Array<string> = [];

  constructor(
    private readonly addColDef: AddPermissionsColDefs,
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.colDefs = this.addColDef.getColDefs();
  }
  ngOnInit() {
    this.ngxPermission
      .hasPermission(['root_admin', 'add_user_permissions'])
      .then((has) => {
        if (has) this.store.dispatch(fetchPermissions());
      });
    this.store.select(selectPermissions).subscribe((permissions) => {
      if (isEmpty(permissions)) return;
      this.rowData = (permissions as PermissionType[]).filter(
        (permission) => !this.dialogData.selectedData.includes(permission.id)
      );
    });
  }

  onRowSelectionChange(selectedRows: PermissionType[]) {
    this.selectedRowIds = selectedRows.map((row) => row.slug);
  }

  addPermissions() {
    if (isEmpty(this.selectedRowIds)) return;
    this.store.dispatch(
      addPermissionsToUser({
        ids: this.selectedRowIds,
        userId: this.dialogData.userId,
      })
    );
  }
  public isRowSelectable(nodes: IRowNode<PermissionType>): boolean {
    return nodes.data?.allowed === true;
  }
}
