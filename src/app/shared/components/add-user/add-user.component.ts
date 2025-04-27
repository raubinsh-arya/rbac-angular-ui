import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createUser,
  createUserSuccess,
} from '../../../users/store/actions/user.action';
import { selectCreateUserLoading } from '../../../users/store/selectors/users.selector';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';

export const passwordMatchValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('password_confirmation')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  public loading!: boolean;
  public userForm!: FormGroup;
  statusOptions = ['unauth', 'active', 'deactive', 'block'];
  private readonly dialogRef = inject(MatDialogRef<AddUserComponent>);

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly actions: Actions,
    private readonly ngxPermission: NgxPermissionsService
  ) {
    this.store
      .select(selectCreateUserLoading)
      .subscribe((loading) => (this.loading = loading));

    this.actions.pipe(ofType(createUserSuccess)).subscribe(() => {
      this.dialogRef.close();
    });
  }

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        middleName: [''],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        mobile: [''],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
        status: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  async onSubmit() {
    if (
      this.userForm.valid &&
      (await this.ngxPermission.hasPermission(['root_admin', 'create_user']))
    ) {
      this.store.dispatch(createUser({ user: this.userForm.value }));
    }
  }
}
