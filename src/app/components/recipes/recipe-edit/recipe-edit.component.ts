import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';

import { RecipiesService } from 'src/app/services/recipies.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipiesService: RecipiesService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = params.id != null;
    });
    const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    let recipeName = '';
    let recipePhotoURL = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipiesService.currentRecipeSelection;
      recipeName = recipe.name;
      recipePhotoURL = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      recipeName: new FormControl(recipeName, [Validators.required]),
      recipeDesc: new FormControl(recipeDescription, [Validators.required]),
      recipePhotoURL: new FormControl(recipePhotoURL, [Validators.required, Validators.pattern(urlReg)]),
      ingredients: recipeIngredients
    });

  }

  onSubmit() {
    if (!this.editMode) {
      this.addRecipe();
    } else {
      this.updateRecipe();
    }
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addRecipe() {
    const newRecipe: Recipe = {
      id: `id-${this.guid()}`,
      name: this.recipeForm.value.recipeName,
      description: this.recipeForm.value.recipeDesc,
      imagePath: this.recipeForm.value.recipePhotoURL,
      ingredients: []
    };
    this.recipeForm.value.ingredients.forEach((ingredient: Ingredient) => {
      newRecipe.ingredients.push(ingredient);
    });
    const newRecipesList = this.recipiesService.addRecipe(newRecipe);
    this.recipiesService.recipeList.next(newRecipesList);
    this.snackbarService.showSnackbar(`${newRecipe.name} added`, 1000, 'success');
  }

  updateRecipe() {
    const updatedRecipe: Recipe = {
      id: this.recipiesService.currentRecipeSelection.id,
      name: this.recipeForm.value.recipeName,
      description: this.recipeForm.value.recipeDesc,
      imagePath: this.recipeForm.value.recipePhotoURL,
      ingredients: []
    };
    this.recipeForm.value.ingredients.forEach((ingredient: Ingredient) => {
      updatedRecipe.ingredients.push(ingredient);
    });
    const updatedRecipesList = this.recipiesService.updateRecipe(updatedRecipe);
    this.recipiesService.recipeList.next(updatedRecipesList);
    this.snackbarService.showSnackbar(`${updatedRecipe.name} updated`, 1000, 'success');
  }

  onAddIngredient() {
    const ingredientsFormGroup = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      amount : new FormControl(null, [Validators.required]),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(ingredientsFormGroup);
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients') as FormArray).controls.splice(index, 1);
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
