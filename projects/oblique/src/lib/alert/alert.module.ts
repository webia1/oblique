import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {obliqueProviders} from '../utilities';
import {ObAlertComponent} from './alert.component';
import {ObIconModule} from '../icon/icon.module';
import {ObTelemetryService} from '../telemetry/telemetry.service';
import {requireAndRecordTelemetry} from '../telemetry/telemetry-require';

export {ObAlertComponent, OBLIQUE_HAS_ROLE_ALERT} from './alert.component';
export {ObIAlertType} from './alert.model';

@NgModule({
	declarations: [ObAlertComponent],
	imports: [CommonModule, ObIconModule, TranslateModule],
	providers: obliqueProviders(),
	exports: [ObAlertComponent]
})
export class ObAlertModule {
	constructor(telemetry: ObTelemetryService) {
		requireAndRecordTelemetry(telemetry, ObAlertModule);
	}
}
