import { Component } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../../service/layout.service';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '@/service/auth-service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-logo-container">
                <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                    <i class="pi pi-bars"></i>
                </button>
                <a class="layout-topbar-logo" routerLink="/">
                    <span>PawfectCare</span>
                </a>
            </div>

            <div class="layout-topbar-actions">
                <div class="layout-config-menu">
                    <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                        <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                    </button>
                    <div class="relative">
                        <app-configurator />
                    </div>
                </div>

                <div class="layout-topbar-menu hidden lg:block">
                    <div class="layout-topbar-menu-content">
                        <button #userMenuButton type="button" class="layout-topbar-action" (click)="menu.toggle($event)">
                            <i class="pi pi-user"></i>
                            <span>User</span>
                        </button>
                        <p-menu #menu [popup]="true" [model]="items"></p-menu>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppTopbar {
    items: MenuItem[];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private confirmationService: ConfirmationService
    ) {
        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-id-card',
                routerLink: '/profile'
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
            }
        ];
    }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    logout() {
        this.confirmationService.confirm({
            header: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            accept: () => {
                this.authService.logout();
            }
        });
    }
}
