import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radioButton';
import { StudentComponent } from './student/student.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { EditStudentComponent } from './student/edit-student.component/edit-student.component';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
@NgModule({
  declarations: [AppComponent, StudentComponent, EditStudentComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RadioButtonModule,
    ButtonModule,
    CheckboxModule,
    AccordionModule,
    PanelModule,
    TableModule,
    ToolbarModule,
    FileUploadModule,
    NgbModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DynamicDialogModule,
    DropdownModule,
    PaginatorModule,
    ScrollingModule
  ],
  providers: [DialogService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
