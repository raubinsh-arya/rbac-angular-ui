import { Component, inject } from '@angular/core';
import { ColDef, IRowNode } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { AddPermissionsColDefs } from './col-def.service';
import { PermissionType } from '../../../models/permission.model';
import {
  addPermissionsToRole,
  fetchPermissions,
} from '../../../roles/store/actions/roles.action';
import { selectPermissions } from '../../../roles/store/selectors/permissions.selector';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-add-permissions',
  templateUrl: './add-permissions-role.component.html',
  styleUrl: './add-permissions-role.component.scss',
})
export class SharedAddPermissionsRoleComponent {
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
      .hasPermission(['root_admin', 'add_role_permissions'])
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
      addPermissionsToRole({
        permissions: this.selectedRowIds,
        id: this.dialogData.userId,
      })
    );
  }
  public isRowSelectable(nodes: IRowNode<PermissionType>): boolean {
    return nodes.data?.allowed === true;
  }
}
