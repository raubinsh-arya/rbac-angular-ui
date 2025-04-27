import { Component, OnInit } from '@angular/core';
import { UsersColDefs } from './col-def.service';
import { CellValueChangedEvent, ColDef, IRowNode } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { deleteUsers, fetchUsers } from '../store/actions/user.action';
import { selectUsers } from '../store/selectors/users.selector';
import { UserProfileResponseType } from '../../models/user.model';
import { NgxPermissionsService } from 'ngx-permissions';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../../shared/components/add-user/add-user.component';

@Component({
  selector: 'users-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrl: './user-grid.component.scss',
})
export class UserGridComponent implements OnInit {
  public colDefs!: ColDef[];
  public rowData!: UserProfileResponseType[];
  public permissions!: string[];
  public selectedRows: number[] = [];

  constructor(
    private readonly colDef: UsersColDefs,
    private readonly store: Store,
    private readonly ngxPermission: NgxPermissionsService,
    private readonly dialog: MatDialog
  ) {
    this.colDefs = this.colDef.getColDefs();
    this.store
      .select(selectUsers)
      .subscribe(
        (users) =>
          (this.rowData = structuredClone(users) as UserProfileResponseType[])
      );
  }

  ngOnInit() {
    this.ngxPermission
      .hasPermission(['view_users', 'root_admin'])
      .then((has) => {
        if (has) this.store.dispatch(fetchUsers());
      });
  }

  onCellValueChanged(props: CellValueChangedEvent) {}

  public onSelectionChanged(selectedRows: Array<UserProfileResponseType>) {
    this.selectedRows = selectedRows.map((row) => row.id);
  }

  public createUser() {
    this.dialog.open(AddUserComponent, { minWidth: 700, minHeight: 350 });
  }
  public async deleteUsers() {
    if (await this.ngxPermission.hasPermission(['root_admin', 'delete_users']))
      this.store.dispatch(deleteUsers({ userIds: this.selectedRows }));
  }

  public isRowSelectable(nodes: IRowNode<UserProfileResponseType>): boolean {
    return nodes.data?.id != 1;
  }
}
