import { Component, OnInit, DoCheck } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipiesService } from '../../services/recipies.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipeSelection: Recipe;
  recipes: Recipe[] = [];

  constructor(
    private recipesServices: RecipiesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.recipeSelection = this.recipesServices.currentRecipeSelection;
    this.recipesServices.recipeSelected.next(this.recipeSelection);
  }

  search(event) {
      const searchRecipe = event.target.value;
      const recipeFound = this.recipesServices.searchRecipes(searchRecipe);
      if ( recipeFound.length > 0 ) {
        this.recipeSelection = recipeFound[0];
        this.recipesServices.recipeList.next(recipeFound);
        this.recipesServices.recipeSelected.next(recipeFound[0]);
        this.router.navigate([recipeFound[0].id], { relativeTo: this.route });
      } else {
        const recipes = this.recipesServices.getRecipes();
        this.recipesServices.recipeList.next(recipes);
        this.recipesServices.recipeSelected.next(recipes[0]);
        this.router.navigate(['not-found'], { relativeTo: this.route });
      }
    // }
  }
}
