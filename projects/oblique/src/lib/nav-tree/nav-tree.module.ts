import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {ObNavTreeComponent} from './nav-tree.component';
import {ObNavTreeFakeFocusDirective} from './nav-tree-fake-focus.directive';
import {obliqueProviders} from '../utilities';

export {ObNavTreeComponent} from './nav-tree.component';
export {ObNavTreeFakeFocusDirective} from './nav-tree-fake-focus.directive';
export {ObNavTreeItemModel} from './nav-tree-item.model';

@NgModule({
	imports: [CommonModule, MatIconModule, RouterModule, TranslateModule],
	declarations: [ObNavTreeComponent, ObNavTreeFakeFocusDirective],
	providers: obliqueProviders(),
	exports: [ObNavTreeComponent, ObNavTreeFakeFocusDirective]
})
export class ObNavTreeModule {}
