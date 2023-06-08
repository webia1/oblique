import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PreviewComponent} from '../../../../code-examples.model';

@Component({
	selector: 'app-button-example-secondary-link-no-icon',
	templateUrl: './button-example-secondary-link-no-icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonExampleSecondaryLinkNoIconComponent implements PreviewComponent {}