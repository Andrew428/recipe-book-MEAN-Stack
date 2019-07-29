import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsListSub: Subscription;
  private updatingSLingredientSub: Subscription;
  ingredientToUpdate = null;

  constructor(
    private shoppingListService: ShoppingListService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.ingredients;
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsListSub = this.shoppingListService.ingredientsList.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy() {
    this.ingredientsListSub.unsubscribe();
  }

  deleteIngredient(ingredient: Ingredient, index: number) {
    this.shoppingListService.deleteIngredient(ingredient, index);
    this.snackbarService.showSnackbar(`${ingredient.name} removed`, 1000, 'danger');
  }

  updateSLIngredientSelected(ingredient: Ingredient, index: number) {
    this.ingredientToUpdate = index;
    this.shoppingListService.updateSLIngredientSelected(ingredient, index);
    this.updatingSLingredientSub = this.shoppingListService.updatingSlIngredient.subscribe((updating) => {
      if (!updating) {
        this.ingredientToUpdate = null;
        this.snackbarService.showSnackbar(`${ingredient.name} saved`, 1000, 'success');
      }
    });

  }

}
