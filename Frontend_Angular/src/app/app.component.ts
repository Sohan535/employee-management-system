import { Component, Renderer2, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeListComponent, UpdateEmployeeComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  isDarkMode = false;
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      this.enableDarkMode();
    }
  }
}

toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
  if (this.isDarkMode) {
    this.enableDarkMode();
  } else {
    this.disableDarkMode();
  }
}

enableDarkMode() {
  if (isPlatformBrowser(this.platformId)) {
    this.renderer.addClass(document.body, 'dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  }
  this.isDarkMode = true;
}

disableDarkMode() {
  if (isPlatformBrowser(this.platformId)) {
    this.renderer.removeClass(document.body, 'dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
  this.isDarkMode = false;
}
  title = 'Employment-Management-System';
}
