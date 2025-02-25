import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { setupMsw } from './app/mocks/browser';

setupMsw().then(() => { bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err))});
