import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationInterceptor } from './shared/services/authentication.interceptor';
import { NewLoginComponent } from './login/new-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { UrlInterceptor } from './shared/services/url.interceptor';

const routes: Routes = [
  { path: '*',  component:AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newlogin', component: NewLoginComponent },
  { path: 'students', component: StudentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    EditStudentComponent,
    SpinnerComponent,
    LoginComponent,
    NavbarComponent,
  ],
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
    ScrollingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    DialogService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,

      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
