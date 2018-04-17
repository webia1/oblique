import {Directive, ElementRef, HostBinding, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MasterLayoutFooterService} from './master-layout-footer.service';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../unsubscribe';

@Directive({
	selector: '[orMasterLayoutFooter]',
	exportAs: 'orMasterLayoutFooter'
})
export class MasterLayoutFooterDirective extends Unsubscribable {

	@HostBinding('class.application-footer-sm')
	public footerSM = false;

	constructor(private footerService: MasterLayoutFooterService,
				private elementRef: ElementRef,
				@Inject(DOCUMENT) private document: any) {
		super();

		this.footerService.small = this.elementRef.nativeElement.classList.contains('application-footer-sm');

		this.footerService.variantChange
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((footerSM) => {
				this.footerSM = footerSM;
			});
	}
}