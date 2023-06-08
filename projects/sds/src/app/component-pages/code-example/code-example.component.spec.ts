import {Component, Type} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CodeExampleComponent} from './code-example.component';
import {SourceCode} from './source-code.model';
import {TabComponent} from '../tabs/tab/tab.component';
import {TabsComponent} from '../tabs/tabs.component';
import {IdModule} from '../../shared/id/id.module';
import {IdPipe} from '../../shared/id/id.pipe';
import {UnitTestHelpers} from '../../../test-helpers/unit-test-helpers/unit-test-helpers';
import {HighlightedCodeComponent} from './highlighted-code/highlighted-code.component';
import {PreviewComponent} from '../code-examples.model';
import {CodeExampleDirective} from '../code-example.directive';

@Component({
	selector: 'app-preview',
	template: ''
})
class MockPreviewComponent implements PreviewComponent {}

describe(`${CodeExampleComponent.name}`, () => {
	let component: CodeExampleComponent;
	let fixture: ComponentFixture<CodeExampleComponent>;

	const idPipe = new IdPipe();

	const getIdParts: (id?: string) => string[] = (id?: string) => {
		const idParts = [component.componentId];

		if (id) {
			idParts.push(id);
		}

		return idParts;
	};

	const setupComponent = async (inputs?: ComponentInputs): Promise<void> => {
		await TestBed.configureTestingModule({
			declarations: [
				CodeExampleComponent,
				HighlightedCodeComponent,
				TabComponent,
				TabsComponent,
				MockPreviewComponent,
				CodeExampleDirective
			],
			imports: [IdModule]
		}).compileComponents();

		fixture = TestBed.createComponent(CodeExampleComponent);
		component = fixture.componentInstance;
		component.codeSnippets = inputs?.codeSnippets ?? [];
		component.idPrefix = inputs?.idPrefix ?? '';
		component.preview = inputs?.preview;

		await fixture.whenStable().then(() => {
			fixture.detectChanges();
		});
	};

	afterEach(() => {
		fixture.destroy();
	});

	it.each<{id: string}>([{id: 'tabs'}])('should display $id when only idPrefix input is truthy', async ({id}) => {
		await setupComponent({idPrefix: 'test'});

		expect(UnitTestHelpers.getDebugElementById(fixture, idPipe.transform(component.idPrefix, getIdParts(id)))).toBeTruthy();
	});

	it.each<{id: string}>([{id: 'preview-tab'}, {id: 'html-tab'}, {id: 'scss-tab'}, {id: 'ts-tab'}])(
		'should not display $id when only idPrefix input is truthy',
		async ({id}) => {
			await setupComponent({idPrefix: 'test'});

			expect(UnitTestHelpers.getDebugElementById(fixture, idPipe.transform(component.idPrefix, getIdParts(id)))).toBeFalsy();
		}
	);

	it.each<{id: string}>([{id: 'tabs'}, {id: 'html-tab'}, {id: 'scss-tab'}, {id: 'ts-tab'}])(
		'should display $id when only codeSnippets & idPrefix inputs are truthy',
		async ({id}) => {
			await setupComponent({
				codeSnippets: [new SourceCode('soucecode', 'html'), new SourceCode('soucecode', 'scss'), new SourceCode('soucecode', 'ts')],
				idPrefix: 'test'
			});

			expect(UnitTestHelpers.getDebugElementById(fixture, idPipe.transform(component.idPrefix, getIdParts(id)))).toBeTruthy();
		}
	);

	it.each<{id: string}>([{id: 'preview-tab'}])(
		'should not display $id when only codeSnippets & idPrefix inputs are truthy',
		async ({id}) => {
			await setupComponent({codeSnippets: [new SourceCode('soucecode', 'title')], idPrefix: 'test'});

			expect(UnitTestHelpers.getDebugElementById(fixture, idPipe.transform(component.idPrefix, getIdParts(id)))).toBeFalsy();
		}
	);

	it.each<{id: string}>([{id: 'tabs'}, {id: 'preview-tab'}, {id: 'html-tab'}, {id: 'scss-tab'}, {id: 'ts-tab'}])(
		'should display $id when all inputs are truthy',
		async ({id}) => {
			await setupComponent({
				codeSnippets: [new SourceCode('soucecode', 'html'), new SourceCode('soucecode', 'scss'), new SourceCode('soucecode', 'ts')],
				idPrefix: 'test',
				preview: MockPreviewComponent
			});

			expect(UnitTestHelpers.getDebugElementById(fixture, idPipe.transform(component.idPrefix, getIdParts(id)))).toBeTruthy();
		}
	);
});

interface ComponentInputs {
	codeSnippets?: SourceCode[];
	idPrefix?: string;
	preview?: Type<PreviewComponent>;
}