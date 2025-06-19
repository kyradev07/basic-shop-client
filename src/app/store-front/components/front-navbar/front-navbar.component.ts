import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '@products/services/category.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  authService = inject(AuthService);
  categoryService = inject(CategoryService);

  categoryResource = rxResource({
    loader: () => this.categoryService.getCategories()
  });
}
