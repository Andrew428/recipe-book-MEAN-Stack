import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-inline-edit',
  templateUrl: './shopping-list-inline-edit.component.html',
  styleUrls: ['./shopping-list-inline-edit.component.scss']
})
export class ShoppingListInlineEditComponent implements OnInit {
  @ViewChild('updateIngredientForm', { static: false }) updateIngredientForm: NgForm;
  slIngredientSelected: Ingredient = this.shoppingListService.slIngredientSelected.ingredient;
  slIngredientSelectedIndex: number = this.shoppingListService.slIngredientSelected.index; 

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {}

  onSubmit() {
    const updatedSLIngredient = {
      name : this.updateIngredientForm.value.name,
      amount : this.updateIngredientForm.value.amount,
    };
    this.shoppingListService.saveSLIngredientSelected(updatedSLIngredient, this.slIngredientSelectedIndex);
  }

  cancelUpdate() {
    this.shoppingListService.cancelSLIngredientUpdate();
  }

}
