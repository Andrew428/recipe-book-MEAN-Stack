import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Franks Redhot', '1 1/3 cup'),
    new Ingredient('cold butter', '1/ cup'),
    new Ingredient('garlic powder', '2 teaspoons')
  ];
  ingredientsList = new Subject<Ingredient[]>();
  slIngredientSelected: {ingredient: Ingredient, index: number};
  updatingSlIngredient = new Subject<boolean>();
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: string) {
    const ingredient = new Ingredient(name, amount);
    this.ingredients.push(ingredient);
    this.ingredientsList.next(this.ingredients.slice());
  }

  addAllIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsList.next(this.ingredients.slice());
  }

  deleteIngredient(ingredient: Ingredient, index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsList.next(this.ingredients.slice());
  }

  clearIngredients() {
    this.ingredients.splice(0, this.ingredients.length);
    this.ingredientsList.next(this.ingredients.slice());
  }

  updateSLIngredientSelected(ingredientSelected: Ingredient, i: number) {
    this.updatingSlIngredient.next(true);
    this.slIngredientSelected = {
      ingredient: ingredientSelected,
      index: i
    };
  }

  saveSLIngredientSelected(updatedIngredient: Ingredient, index: number) {
    this.ingredientsList[index] = updatedIngredient;
    this.updatingSlIngredient.next(false);
  }

  cancelSLIngredientUpdate() {
    this.updatingSlIngredient.next(false);
  }

  getSLIngredientSelected() {
    return this.slIngredientSelected;
  }


}
