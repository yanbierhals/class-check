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
        ProfileComponent,
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
    expect(compiled.querySelector('.profile-info h2')?.textContent).toContain(component.usuario.nome);
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
    expect(sidebar?.classList.contains('aberto')).toBeTrue();
    menuButton.click();
    fixture.detectChanges();
    expect(component.menuAberto).toBeFalse();
    expect(sidebar?.classList.contains('aberto')).toBeFalse();
  });

  it('should toggle event details for eventosParticipados when an event summary is clicked', () => {
    if (component.eventosParticipados && component.eventosParticipados.length > 0) {
      const firstEvent = component.eventosParticipados[0]; 
      firstEvent.expandido = false;
      fixture.detectChanges();
      expect(firstEvent.expandido).toBeFalse();

      const eventCards = fixture.nativeElement.querySelectorAll('.event-list:not(.created-events) .event-card .event-summary');
      expect(eventCards.length).toBeGreaterThan(0);
      const eventCardToClick = eventCards[0] as HTMLElement;

      eventCardToClick.click();
      fixture.detectChanges();

      expect(firstEvent.expandido).toBeTrue();
      const eventDetails = fixture.nativeElement.querySelector('.event-list:not(.created-events) .event-card .event-details');
      expect(eventDetails).toBeTruthy();
    } else {
      pending('No eventosParticipados to test');
    }
  });

  it('should toggle event details for eventosCriados when an event summary is clicked', () => {
    if (component.eventosCriados && component.eventosCriados.length > 0) {
      const firstCreatedEvent = component.eventosCriados[0];
      firstCreatedEvent.expandido = false;
      fixture.detectChanges();
      expect(firstCreatedEvent.expandido).toBeFalse();

      const createdEventCards = fixture.nativeElement.querySelectorAll('.event-list.created-events .event-card .event-summary');
      expect(createdEventCards.length).toBeGreaterThan(0);
      const createdEventCardToClick = createdEventCards[0] as HTMLElement;
      
      createdEventCardToClick.click();
      fixture.detectChanges();

      expect(firstCreatedEvent.expandido).toBeTrue();
      const createdEventDetails = fixture.nativeElement.querySelector('.event-list.created-events .event-card .event-details');
      expect(createdEventDetails).toBeTruthy();
    } else {
      pending('No eventosCriados to test');
    }
  });

  it('should have a fixed check button that links to /check-class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const checkButton = compiled.querySelector('.fixed-check-button') as HTMLButtonElement;
    expect(checkButton).toBeTruthy();
    expect(checkButton.getAttribute('routerLink')).toBe('/check-class');
  });

});