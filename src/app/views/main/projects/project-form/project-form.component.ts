import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { ErrorMap } from 'src/app/enums/error-code.enum';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  datasetsToUpload: any[] = [];
  editMode: string = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      datasets: [[], [Validators.required]],
      description: [null],
    });

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.editMode = params.id;
        this.setEditMode(params.id);
      }
    });
  }

  ngOnInit(): void {}

  openFileInput(input: any): void {
    input.click();
  }

  saveProject(): void {
    if (!this.validateForm()) { return; }
    if (this.editMode) {
      this.projectService.saveEdit(this.projectForm.value).subscribe(
        () => {
          this.router.navigate(['/projects']);
        },
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
        }
      );
    } else {
      this.projectService
        .addProject(this.projectForm.value, this.datasetsToUpload)
        .subscribe(
          () => {
            this.router.navigate(['/projects']);
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
          }
        );
    }
  }

  handleFileInput(files: FileList): void {
    Array.from(files).forEach((file: File) => {
      this.datasetsToUpload.push(file);
    });
  }

  removeDataset(index: number): void {
    this.datasetsToUpload.splice(index, 1);
  }

  setEditMode(id: string): void {
    this.projectService.getOneProject(id).subscribe((response) => {
      this.projectForm.get('id').setValue(response.id);
      this.projectForm.get('name').setValue(response.name);
      this.projectForm.get('datasets').setValue(response.datasets);
      this.projectForm.get('description').setValue(response.description);

      this.datasetsToUpload = response.datasets.map((file) => ({
        name: file.filename,
      }));
    });
  }

  getControlError(control: string): boolean {
    const formControl = this.projectForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.projectForm.valid) {
      return true;
    }
    this.projectForm.markAllAsTouched();
    return false;
  }
}
