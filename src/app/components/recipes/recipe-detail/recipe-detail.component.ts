import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipiesService } from 'src/app/services/recipies.service';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ActivatedRoute, Router, Data, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


  recipeDetails: Recipe;
  id: string;
  private recipeSelectedSub: Subscription;

  constructor(
    private recipesServices: RecipiesService,
    private shoppingListServices: ShoppingListService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.recipeDetails = this.recipesServices.getRecipe(null);
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.recipeDetails = this.recipesServices.getRecipe(this.id);
    }, (error) => {
      console.log(error);
    });
    this.recipeSelectedSub = this.recipesServices.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeDetails = recipe;
    });
  }

  ngOnDestroy() {
    this.recipeSelectedSub.unsubscribe();
  }

  addAllToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListServices.addAllIngredients(ingredients);
    this.snackbarService.showSnackbar('All ingredients added to shopping list', 1000, 'success');
  }

  addToShoppingList(ingredient: Ingredient, index: number) {
    this.shoppingListServices.addIngredient(ingredient.name, ingredient.amount);
    this.snackbarService.showSnackbar(`${ingredient.name} added to shopping list`, 1000, 'success');
  }

  editRecipe(recipe: Recipe) {
    this.router.navigate(['/recipes', recipe.id, 'edit']);
  }

  deleteRecipe() {
    const deletedRecipe  = this.recipesServices.currentRecipeSelection;
    const updatedRecipesList = this.recipesServices.deleteRecipe(this.recipesServices.currentRecipeSelection);
    this.recipesServices.recipeList.next(updatedRecipesList);
    this.snackbarService.showSnackbar(`${deletedRecipe.name} removed`, 1000, 'danger');
  }
}
