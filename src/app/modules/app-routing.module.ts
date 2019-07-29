
import { ShoppingListComponent } from '../components/shopping-list/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from '../components/recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailStartComponent } from '../components/recipes/recipe-detail-start/recipe-detail-start.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../services/auth-guard.service';
import { CanDeactivateGuard } from '../services/can-deactivate-guard.service';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RecipeEditComponent } from '../components/recipes/recipe-edit/recipe-edit.component';
import { RecipeNotFoundComponent } from '../components/recipes/recipe-not-found/recipe-not-found.component';



const appRoutes: Routes  = [
    { path: '', redirectTo:  '/recipes/id-123', pathMatch: 'full' },
    { path: 'recipes', component:  RecipesComponent , children: [
        { path: '', redirectTo:  '/recipes/id-123', pathMatch: 'full'},
        { path: 'new', component:  RecipeEditComponent },
        { path: 'not-found', component:  RecipeNotFoundComponent },
        { path: ':id', component:  RecipeDetailComponent },
        { path: 'start', component:  RecipeDetailStartComponent },
        { path: ':id/edit', component:  RecipeEditComponent },
    ]},
    { path: 'shopping', component:  ShoppingListComponent },
    { path: '404', component:  PageNotFoundComponent, data: {message: 'Page Not Fund'} },
    { path: '**', redirectTo:  '404' },
  ];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes)
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
