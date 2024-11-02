import { AppRoutingModule } from '../app-routing.module';
import { AfterViewInit, Component, OnInit, Input, ViewChild, ChangeDetectorRef, ElementRef} from '@angular/core';
import { sentences } from './sentences';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
declare var JSConfetti: any;

@Component({
    selector: 'app-order-quiz',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
  })
  export class OrderComponent implements AfterViewInit{
    @Input() name = 'P';

    @ViewChild('dropList') dropListRef: ElementRef | undefined;

    words = ['Put', 'these', 'words', 'in', 'the', 'right', 'order'];
    sentence: any;
    originalWords = ['Put', 'these', 'words', 'in', 'the', 'right', 'order'];
    shuffledWords = ['Put', 'these', 'words', 'in', 'the', 'right', 'order'];
    newOrder = [];
    isCorrect = false;
    jsConfetti = new JSConfetti();
  
    ngAfterViewInit() {
      let sentence = sentences[Math.floor(Math.random() * sentences.length)];
console.log(sentence);
      this.words = sentence.replace(/<|>/g, '').split(' ');
      this.originalWords = sentence.replace(/<|>/g, '').split(' ');;
      // Perform operations after the view is initialized, such as custom logic with drag-drop
      console.log('Drop list reference:', this.dropListRef);
      // You could manipulate the DOM directly or apply custom drag-and-drop settings
      // such as adding event listeners or custom styles dynamically.
      this.shuffledWords = this.shuffleArray(this.words);
      console.log(this.originalWords);
      console.log(this.words);
    console.log(this.shuffledWords);

   
  }

  ciao(word: string){
    window.open(
      'https://dict.leo.org/italienisch-deutsch/' + word,
      '_blank'
    );
  }
    
    shuffleArray(words: any) { 
      for (let i = words.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [words[i], words[j]] = [words[j], words[i]]; 
      } 
      return words; 
    }

  
    drop(event: CdkDragDrop<string[]>) {
      // Use Angular's drag-drop API to move items in an array after a drop event
      moveItemInArray(this.shuffledWords, event.previousIndex, event.currentIndex);
     
    }

    checkOrder() {
      console.log(this.shuffledWords);
      console.log(this.originalWords);
      if (this.shuffledWords.join(' ') === this.originalWords.join(' ')) {
        this.isCorrect = true;
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
        this.isCorrect = false;
        alert('Riprova Schatz!💋');
      }
    }

    newGame(){
      location.reload()
    }
  }