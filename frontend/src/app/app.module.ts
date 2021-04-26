import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginPageComponent } from './login-page/login-page.component';
import { FacultyNavComponent } from './faculty-nav/faculty-nav.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreateUserComponent } from './create-user/create-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewFeeComponent } from './view-fee/view-fee.component';
import { ManageFeeComponent } from './manage-fee/manage-fee.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { ManageSubjectsComponent } from './manage-subjects/manage-subjects.component';
import { ViewSubjectsComponent } from './view-subjects/view-subjects.component'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TimeTableComponent } from './time-table/time-table.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { NoticesComponent } from './notices/notices.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginPageComponent,
    FacultyNavComponent,
    DashboardComponent,
    CreateUserComponent,
    ManageUserComponent,
    CreateStudentComponent,
    ManageStudentsComponent,
    StudentListComponent,
    UserListComponent,
    ViewFeeComponent,
    ManageFeeComponent,
    ViewCoursesComponent,
    ManageCoursesComponent,
    ManageSubjectsComponent,
    ViewSubjectsComponent,
    TimeTableComponent,
    NoticesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxPaginationModule,
    MatChipsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatBottomSheetModule,
    PdfViewerModule
  ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
