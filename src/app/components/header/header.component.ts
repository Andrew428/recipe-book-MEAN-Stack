import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipiesService } from 'src/app/services/recipies.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 
  collapsed = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesServices: RecipiesService,
  ) { }

  ngOnInit() {
  }

  onNavSelect(navSelected: string) {
    if (navSelected === 'recipe') {
      let recipe = this.recipesServices.getCurrentRecipeSelection();
      this.router.navigate(['recipes', recipe.id]);
    } else if (navSelected === 'shopping') {
      this.router.navigate(['shopping'], { relativeTo: this.route });
    }
  }

}
