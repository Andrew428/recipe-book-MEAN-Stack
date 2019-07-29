import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SnackbarService } from '../../../services/snackbar.service';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  // @ViewChild('name', {static: false}) nameRef = ElementRef;
  // @ViewChild('amount', {static: false}) amountRef = ElementRef;
  @ViewChild('addIngredientForm', { static: false }) addIngredientForm: NgForm;
  @Input() amount: string;
  @Input() name: string;

  constructor(
    private shoppingListService: ShoppingListService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
  }
  addIngredient(name: string, amount: string) {
    this.shoppingListService.addIngredient(name, amount);
  }

  onSubmit() {
    this.name = this.addIngredientForm.value.name;
    this.amount = this.addIngredientForm.value.amount;
    this.shoppingListService.addIngredient(this.name, this.amount);
    this.snackbarService.showSnackbar(`${this.name} added to recipe book`, 1000, 'success');
  }

  clearIngredients() {
    this.shoppingListService.clearIngredients();
    this.snackbarService.showSnackbar(`Shopping List cleared`, 1000, 'primary');
  }

}
