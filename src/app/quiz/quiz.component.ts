
import { AppRoutingModule } from '../app-routing.module';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { sentences } from './sentences';
declare var JSConfetti: any;


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
  })
  export class QuizComponent implements AfterViewInit {
    
    pre = '';
    post = '';
    words: string[] = [];
    @ViewChild('container') container: any;
    sentence = '';
    value = '';
    word = '';
    jsConfetti = new JSConfetti();
    preSlice: string[] = [];
    postSlice: string[] = [];


    ngAfterViewInit() {
      let sentence = sentences[Math.floor(Math.random() * sentences.length)];
      console.log(sentence);
      const all = JSON.stringify(sentences);
      const option = all.match(/<.*?>/g)!;
      const matchAll = sentence.split(" ");

      const indexes = [];
      for (let i = 0; i < matchAll.length; i++) {
        const element = matchAll[i];
        if (/<.*?>.*/.test(element)) {
          indexes.push(i)
        }
      }


      const index = indexes[Math.floor(Math.random() * (indexes.length))];
      
      this.word = matchAll[index].replace(/<|>/g, '');
      this.pre = matchAll.slice(0, index).join(' ').replace(/<|>/g, '');
      this.preSlice = this.pre.split(" ");
      this.post = matchAll.slice(index + 1).join(' ').replace(/<|>/g, '');
      this.postSlice = this.post.split(" ");
      console.log(this.pre);
      console.log(this.post);

      this.words = [];
      [0, 1, 2, 3].forEach(e => {
        const random = option[Math.floor(Math.random() * (option.length - 1)) + 1].replace(/<|>/g, '');
        this.words.push(random)
      });
      this.words.push(this.word);
      this.words = this.words.sort((a: string, b: string) => Math.random() > 0.5 ? 1 : -1);
     /*  this.sentence = sentence.replace(word, 'SOS').replace(/<|>/g, '')
      .replace('SOS', '<select class="form-control d-inline w-auto">' + options.map(e => '<option>' + e + '</option>').join('') + '</select>');
      console.log(this.sentence)
      let selectedOption = 
      this.container.nativeElement.innerHTML = this.sentence; */
    }

    ciaoPre(){
      for (let i = 0; i < this.preSlice.length; i++) {
        const element = this.preSlice[i];
        window.open(
          'https://dict.leo.org/italienisch-deutsch/' + element,
          '_blank'
        );
      }
    }
    ciaoPost(item: string){
        window.open(
          'https://dict.leo.org/italienisch-deutsch/' + item,
          '_blank'
        );
    }

    checkOption(){
      if (this.value === this.word) {
        this.jsConfetti.addConfetti({
          emojis: ['🕂', '🍻', '🥨', '💋'],
          emojiSize: 70,
          confettiNumber: 80,
        })
        setTimeout(() => {
          document.body.style.backgroundColor = 'transparent';
          this.newGame()
        }, 3000);
        
      } else {
        alert('Riprova Schatz!💋')
      }
    }

    newGame(){
      location.reload()
    }
  }