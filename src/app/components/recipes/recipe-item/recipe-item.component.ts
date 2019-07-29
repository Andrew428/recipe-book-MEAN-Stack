import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipiesService } from 'src/app/services/recipies.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() id: number;
  constructor(
    private recipesServices: RecipiesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  recipeSelected() {
    console.log(this.route);
    this.router.navigate([this.recipe.id], { relativeTo: this.route });
    this.recipesServices.setCurrentRecipeSelection(this.recipe);
    }

}
