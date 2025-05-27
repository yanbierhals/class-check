import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent, // Componente standalone importa a si mesmo
        CommonModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-info h2')?.textContent).toContain('Yan Bierhals');
  });

  it('should have a menu button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header .menu-button')).toBeTruthy();
  });

  it('should toggle sidebar when menu button is clicked', () => {
    expect(component.menuAberto).toBeFalse();
    const menuButton = fixture.nativeElement.querySelector('header .menu-button') as HTMLButtonElement;
    menuButton.click();
    fixture.detectChanges();
    expect(component.menuAberto).toBeTrue();
    const sidebar = fixture.nativeElement.querySelector('.sidebar');
    expect(sidebar.classList.contains('aberto')).toBeTrue();
    menuButton.click();
    fixture.detectChanges();
    expect(component.menuAberto).toBeFalse();
    expect(sidebar.classList.contains('aberto')).toBeFalse();
  });

  it('should toggle event details when an event summary is clicked', () => {
    const firstEvent = component.eventos[0];
    expect(firstEvent.expandido).toBeFalse();
    const eventCard = fixture.nativeElement.querySelector('.event-card .event-summary') as HTMLElement;
    eventCard.click();
    fixture.detectChanges();
    expect(firstEvent.expandido).toBeTrue();
    const eventDetails = fixture.nativeElement.querySelector('.event-details');
    expect(eventDetails).toBeTruthy();
  });
});