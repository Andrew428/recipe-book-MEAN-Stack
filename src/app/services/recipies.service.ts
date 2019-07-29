import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {
  private recipes: Recipe[] = [
    new Recipe(
      'id-123', 'Memphis wings', 'Memphis wings', 'https://live.staticflickr.com/1/276/31787651400_df522bd8ce_z.jpg',
      [
        new Ingredient('Chicken Wings', '5 lbs'),
        new Ingredient('Memphis Rub', '2 tablespoons')
      ]
    ),
    new Recipe(
      'id-abc', 'Buffalo', 'Buffalo Wings', 'https://dinnerthendessert.com/wp-content/uploads/2018/08/Buffalo-Wings-4-688x459.jpg',
      [
        new Ingredient('Chicken Wings', '5 lbs'),
        new Ingredient('Franks Hot Sause', '1 1/3 cup'),
        new Ingredient('butter', '1/2 cup'),
        new Ingredient('garlic powder', '2 teaspoons')
      ]
    ),
    new Recipe(
      'id-xyz', 'Hamberger', 'Famous Hamberger', 'https://makeyourmeals.com/wp-content/uploads/2019/03/air-fryer-hamburger.jpg',
      [
        new Ingredient('Buns', '1 white bun'),
        new Ingredient('hamberger meat', '1/2 pound')
      ]
    ),
  ];
  returnRecipes = this.recipes.slice();
  recipeSelected = new Subject<Recipe>();
  recipeList = new Subject<Recipe[]>();
  currentRecipeSelection: Recipe;

  constructor() {

    if (this.recipes.length > 0) {
      this.currentRecipeSelection = this.recipes[0];
    }
  }

  getRecipes() {
    this.currentRecipeSelection = this.returnRecipes[0];
    return this.returnRecipes;
  }

  getRecipe(id: string) {
    if (id) {
      // tslint:disable-next-line:prefer-for-of
      for ( let i = 0; i < this.returnRecipes.length; i++) {
        if (id === this.returnRecipes[i].id) {
          return this.returnRecipes[i];
        }
      }
    } else {
      return this.returnRecipes[0];
    }
  }

  searchRecipes(value: string) {
      if (value === '') {
        this.returnRecipes = this.recipes.slice();
        this.currentRecipeSelection = this.returnRecipes[0];
        return this.returnRecipes;
      } else {
      const searchFoundArray = [];
      this.recipes.forEach((recipe: Recipe, i) => {
        if (recipe.name.toLowerCase().includes(value.toLowerCase()) || recipe.description.toLowerCase().includes(value.toLowerCase())) {
          searchFoundArray.push(recipe);
        }
      });
      this.returnRecipes = searchFoundArray;
      this.currentRecipeSelection = this.returnRecipes[0];
      return searchFoundArray;
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.returnRecipes = this.recipes.slice();
    return this.returnRecipes;
  }

  updateRecipe(recipe: Recipe) {
    this.currentRecipeSelection = recipe;
    console.log('updating...', recipe);
    for ( let i = 0; i < this.recipes.length; i++) {
      if (recipe.id === this.recipes[i].id) {
        this.recipes[i] = recipe;
      }
    }
    return this.returnRecipes = this.recipes.slice();
  }

  deleteRecipe(recipe: Recipe) {
    console.log('deleting...', recipe);
    const temp = this.recipes.slice();
    for ( let i = 0; i < temp.length; i++) {
      if (recipe.id === temp[i].id) {
        this.recipes.splice(i, 1);
        this.returnRecipes = this.recipes.slice();
        this.currentRecipeSelection = this.returnRecipes[0];
        return this.returnRecipes;
      }
    }
    return this.returnRecipes;
  }

  setCurrentRecipeSelection(recipe: Recipe) {
    this.currentRecipeSelection = recipe;
  }

  getCurrentRecipeSelection() {
    return this.currentRecipeSelection;
  }


}
