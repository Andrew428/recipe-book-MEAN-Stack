import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipiesService } from 'src/app/services/recipies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipeListSub: Subscription;
  constructor(
    private recipesServices: RecipiesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // this.recipes = this.recipesServices.getRecipes();
    this.recipes = this.recipesServices.returnRecipes;
    this.recipeListSub = this.recipesServices.recipeList.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipeListSub.unsubscribe();
  }

  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
