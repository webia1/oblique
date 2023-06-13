import {Component} from '@angular/core';
import {CodeExample, CodeExamples} from '../../code-examples.model';
import {ListGroupExampleDefaultComponent} from './previews/list-group-example-default/list-group-example-default.component';
import {ListGroupExampleCheckBoxComponent} from './previews/list-group-example-checkbox/list-group-example-checkbox.component';
import {ListGroupExampleIconComponent} from './previews/list-group-example-icon/list-group-example-icon.component';
import {ListGroupExampleIconCheckboxComponent} from './previews/list-group-example-icon-checkbox/list-group-example-icon-checkbox.component';

@Component({
	selector: 'app-list-group-code-examples',
	templateUrl: '../../code-examples.component.html'
})
export class ListGroupCodeExamplesComponent extends CodeExamples {
	readonly componentId = 'list-group-examples';

	readonly previews: CodeExample[] = [
		{
			component: ListGroupExampleDefaultComponent,
			idParts: ['default'],
			title: 'Default list group',
			snippets: [
				this.getSnippet('list-group', 'list-group-example-default/list-group-example-default.component.html', 'HTML'),
				this.getSnippet('list-group', 'list-group-example-default/list-group-example-default.component.ts', 'TypeScript')
			]
		},
		{
			component: ListGroupExampleCheckBoxComponent,
			idParts: ['list group', 'checkbox'],
			title: 'List group with checkbox',
			snippets: [
				this.getSnippet('list-group', 'list-group-example-checkbox/list-group-example-checkbox.component.html', 'HTML'),
				this.getSnippet('list-group', 'list-group-example-checkbox/list-group-example-checkbox.component.ts', 'TypeScript')
			]
		},
		{
			component: ListGroupExampleIconComponent,
			idParts: ['list group', 'icon'],
			title: 'List group with icons',
			snippets: [
				this.getSnippet('list-group', 'list-group-example-icon/list-group-example-icon.component.html', 'HTML'),
				this.getSnippet('list-group', 'list-group-example-icon/list-group-example-icon.component.ts', 'TypeScript')
			]
		},
		{
			component: ListGroupExampleIconCheckboxComponent,
			idParts: ['list group', 'icon', 'checkbox'],
			title: 'List group with icons and checkbox',
			snippets: [
				this.getSnippet('list-group', 'list-group-example-icon-checkbox/list-group-example-icon-checkbox.component.html', 'HTML'),
				this.getSnippet('list-group', 'list-group-example-icon-checkbox/list-group-example-icon-checkbox.component.ts', 'TypeScript')
			]
		}
	];
}
