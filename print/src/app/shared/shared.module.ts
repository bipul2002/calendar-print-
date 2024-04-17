import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';

import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ChartModule } from 'primeng/chart';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    StepsModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    ProgressBarModule,
    TabViewModule,
    FieldsetModule,
    DialogModule,
    InputSwitchModule,
    ChipModule,
    ChipsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ChartModule,
    PasswordModule,
    CheckboxModule,
    TreeModule,
    RadioButtonModule,
    InputNumberModule,
    ContextMenuModule,
    FileUploadModule,
    CardModule,
    BreadcrumbModule,
    DividerModule,
    SplitButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ButtonModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    StepsModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    ProgressBarModule,
    TabViewModule,
    FieldsetModule,
    DialogModule,
    InputSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ChartModule,
    PasswordModule,

    CheckboxModule,
    TreeModule,
    ChipModule,
    TreeModule,
    RadioButtonModule,
    InputNumberModule,
    ContextMenuModule,
    FileUploadModule,
    CardModule,
    ChipsModule,
    BreadcrumbModule,
  
    DividerModule,
    SplitButtonModule,
   
  ],
  providers: [DatePipe],
})
export class SharedModule {}
