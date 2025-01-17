// Modules
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Components
import { BookmarkComponent } from './components/header/elements/bookmark/bookmark.component';
import { BootstrapModalComponent } from './components/modals/bootstrap-modal/bootstrap-modal.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CartComponent } from './components/header/elements/cart/cart.component';
import { ContentComponent } from './components/layout/content/content.component';
import { CustomDateSelectorComponent } from './components/datepicker/custom-date-selector/custom-date-selector.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { FullComponent } from './components/layout/full/full.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguagesComponent } from './components/header/elements/languages/languages.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MegaMenuComponent } from './components/header/elements/mega-menu/mega-menu.component';
import { MessageBoxComponent } from './components/header/elements/message-box/message-box.component';
import { NgxDatatableComponent } from './components/tables/ngx-datatable/ngx-datatable.component';
import { NotificationComponent } from './components/header/elements/notification/notification.component';
import { SearchComponent } from './components/header/elements/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { SwiperComponent } from './components/header/elements/swiper/swiper.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { TooglePanelComponent } from './components/accordions/toogle-panel/toogle-panel.component';

// Directives
import { DecimalInputDirective } from './directives/decimal-input.directive';
import { DisableKeyPressDirective } from './directives/disable-key-press.directive';
import { MaxCharactersDirective } from './directives/max-characters.directive';
import { OnlyAlphabetsDirective } from './directives/only-alphabets.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';

// Pipes
import { BooleanToYesNoPipe } from './pipes/boolean-to-yes-no.pipe';

// Services
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LayoutService } from 'src/app/core/services/ui/layout.service';
import { NavService } from 'src/app/core/services/ui/nav.service';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
  declarations: [
    BookmarkComponent,
    BootstrapModalComponent,
    BootstrapModalComponent,
    BreadcrumbComponent,
    CartComponent,
    ContentComponent,
    CustomDateSelectorComponent,
    CustomizerComponent,
    DecimalInputDirective,
    DisableKeyPressDirective,
    FeatherIconsComponent,
    FooterComponent,
    FullComponent,
    HeaderComponent,
    LanguagesComponent,
    LoaderComponent,
    MaxCharactersDirective,
    MegaMenuComponent,
    MessageBoxComponent,
    NgxDatatableComponent,
    NotificationComponent,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,
    SearchComponent,
    SidebarComponent,
    SvgIconComponent,
    SwiperComponent,
    TapToTopComponent,
    TooglePanelComponent,
    ComingSoonComponent,
    FormFieldErrorComponent,
    // Pipes
    BooleanToYesNoPipe,
  ],
  imports: [
    CarouselModule,
    CommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule,
    SwiperModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [NavService, LayoutService],
  exports: [
    // Modules
    FormsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    TranslateModule,

    // Components
    BootstrapModalComponent,
    BreadcrumbComponent,
    CustomDateSelectorComponent,
    FeatherIconsComponent,
    LoaderComponent,
    NgxDatatableComponent,
    SvgIconComponent,
    SwiperModule,
    TapToTopComponent,
    TooglePanelComponent,
    ComingSoonComponent,
    FormFieldErrorComponent,

    // Directives
    DecimalInputDirective,
    DisableKeyPressDirective,
    MaxCharactersDirective,
    OnlyAlphabetsDirective,
    OnlyNumbersDirective,

    // Pipes
    BooleanToYesNoPipe,
  ],
})
export class SharedModule {}
