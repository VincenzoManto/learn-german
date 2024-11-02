import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrammarComponent } from './grammar/grammar.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { QuizComponent } from './quiz/quiz.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'grammar', component: GrammarComponent },
  { path: 'vocabulary', component: VocabularyComponent },
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}