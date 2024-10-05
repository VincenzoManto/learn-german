
import { AppRoutingModule } from '../app-routing.module';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { sentences } from './sentences';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
  })
  export class QuizComponent implements AfterViewInit {

    @ViewChild('container') container: any;
    sentence = '';

    ngAfterViewInit() {
      let sentence = sentences[Math.floor(Math.random() * sentences.length)];
      const all = JSON.stringify(sentences);
      const matchAll = all.match(/<.*?>/g)!;

      const match = sentence.match(/<.*?>/g)!;
      const word = match[Math.floor(Math.random() * (match.length - 1)) + 1];
      let options: string[] = [];
      [0, 1, 2, 3].forEach(e => {
        const random = matchAll[Math.floor(Math.random() * (matchAll.length - 1)) + 1].replace(/<|>/g, '');
        options.push(random)
      });
      options.push(word.replace(/<|>/g, ''));
      options = options.sort((a: string, b: string) => Math.random() > 0.5 ? 1 : -1);
      this.sentence = sentence.replace(word, 'SOS').replace(/<|>/g, '')
      .replace('SOS', '<select class="form-control d-inline w-auto">' + options.map(e => '<option>' + e + '</option>').join('') + '</select>');
      console.log(this.sentence)
      this.container.nativeElement.innerHTML = this.sentence;
    }

  }