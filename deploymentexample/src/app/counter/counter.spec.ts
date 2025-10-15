import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

import { Counter } from './counter';

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with count of 0', () => {
    expect(component.count()).toBe(0);
  });

  it('should increment count', () => {
    component.increment();
    expect(component.count()).toBe(1);

    component.increment();
    expect(component.count()).toBe(2);
  });

  it('should decrement count', () => {
    component.decrement();
    expect(component.count()).toBe(-1);

    component.decrement();
    expect(component.count()).toBe(-2);
  });

  it('should increment and decrement correctly', () => {
    component.increment();
    component.increment();
    component.decrement();
    expect(component.count()).toBe(1);
  });

  it('should have appName from environment', () => {
    expect(component.appName).toBe(environment.appName);
  });

  it('should have production flag from environment', () => {
    expect(component.production).toBe(environment.production);
  });

  it('should render count in template', () => {
    component.increment();
    component.increment();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const countElement = compiled.querySelector('.count-value');
    expect(countElement?.textContent).toContain('2');
  });

  it('should render app name in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('h2');
    expect(titleElement?.textContent).toContain(environment.appName);
  });

  it('should render environment info in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const envElement = compiled.querySelector('.environment-info');
    const expectedEnv = environment.production ? 'Production' : 'Development';
    expect(envElement?.textContent).toContain(expectedEnv);
  });
});
