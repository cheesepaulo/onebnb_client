import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CarouselModule, DropdownModule, AlertModule, ButtonsModule, DatepickerModule, CollapseModule, ModalModule, PaginationModule} from "ng2-bootstrap";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';

import { Property } from './shared/property';

// External Libs
import { Angular2TokenService, A2tUiModule} from 'angular2-token';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './shared/search/search.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { FilterComponent } from './shared/filter/filter.component';
import { MapComponent } from './shared/map/map.component';
import { PropertyBoxComponent } from './shared/property-box/property-box.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { PropertyDetailsComponent } from './property/property-details/property-details.component';
import { ReservationBoxComponent } from './shared/reservation-box/reservation-box.component';
import { LightboxComponent } from './shared/lightbox/lightbox.component';
import { CommentBoxComponent } from './shared/comment-box/comment-box.component';
import { UserDetailBoxComponent } from './shared/user-detail-box/user-detail-box.component';
import { SendMessageComponent } from './shared/send-message/send-message.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

// Services
import { UsersService } from './shared/users.service';
import { ReservationService } from './shared/reservation.service';
import { PropertiesService } from './shared/properties.service';
import { TalksService } from './shared/talks.service';
import { MenuComponent } from './shared/menu/menu.component';
import { TalksListComponent } from './talks/talks-list/talks-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UserEditComponent,
    ResultsComponent,
    SearchComponent,
    PaginationComponent,
    FilterComponent,
    MapComponent,
    PropertyBoxComponent,
    PropertyDetailsComponent,
    ReservationBoxComponent,
    LightboxComponent,
    CommentBoxComponent,
    UserDetailBoxComponent,
    SendMessageComponent,
    MenuComponent,
    TalksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    CollapseModule,
    DatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCRxFy7Flsc2exiivtIfRxirHw-HSs2g7g'}),
    Ng2AutoCompleteModule
  ],
  providers: [PropertiesService, UsersService, Angular2TokenService, ReservationService, TalksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
