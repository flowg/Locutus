'use strict';
import { platformBrowser }    from '@angular/platform-browser';

import { AppModuleNgFactory } from './RootModule/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

