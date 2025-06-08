import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'side-menu',
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  notificationCount = 2;
  isConfigOpen = false;

  toggleConfig() {
    this.isConfigOpen = !this.isConfigOpen;
  }
  
  onClick(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    setTimeout(() => el.blur(), 0);
  }
}