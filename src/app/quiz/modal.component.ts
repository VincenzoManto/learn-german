import { AppRoutingModule } from '../app-routing.module';
import { AfterViewInit, Component, OnInit, Input, ViewChild, ChangeDetectorRef, ElementRef} from '@angular/core';
import { modal } from './sentences';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
declare var JSConfetti: any;

@Component({
    selector: 'app-modal-quiz',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
  })
  export class ModalComponent implements AfterViewInit {
    @Input() name = 'P';

    @ViewChild('dropList') dropListRef: ElementRef | undefined;
  preM = '';
    postM = '';
    wordsM: string[] = [];
    @ViewChild('containerModal') container: any;
    sentenceM = '';
    valueM = '';
    wordM = '';
    jsConfetti = new JSConfetti();
    preSliceM: string[] = [];
    postSliceM: string[] = [];


    ngAfterViewInit() {
      let mod = modal[Math.floor(Math.random() * modal.length)];
      let sentenceM = mod[Math.floor(Math.random() * mod.length)];
      console.log(sentenceM);
      const allM = JSON.stringify(modal);
      const optionM = allM.match(/<.*?>/g)!;
      const matchAllM = sentenceM.split(" ");

      const indexesM = [];
      for (let i = 0; i < matchAllM.length; i++) {
        const elementM = matchAllM[i];
        if (/<.*?>.*/.test(elementM)) {
          indexesM.push(i)
        }
      }


      const indexM = indexesM[Math.floor(Math.random() * (indexesM.length))];
      
      this.wordM = matchAllM[indexM].replace(/<|>/g, '');
      this.preM = matchAllM.slice(0, indexM).join(' ').replace(/<|>/g, '');
      this.preSliceM = this.preM.split(" ");
      this.postM = matchAllM.slice(indexM + 1).join(' ').replace(/<|>/g, '');
      this.postSliceM = this.postM.split(" ");
      console.log(this.preM);
      console.log(this.postM);

      this.wordsM = [];
      [0, 1, 2, 3].forEach(e => {
        const randomM = optionM[Math.floor(Math.random() * (optionM.length - 1)) + 1].replace(/<|>/g, '');
        this.wordsM.push(randomM)
      });
      this.wordsM.push(this.wordM);
      this.wordsM = this.wordsM.sort((a: string, b: string) => Math.random() > 0.5 ? 1 : -1);
   /*   this.sentenceM = sentenceM.replace(this.wordsM, 'SOS').replace(/<|>/g, '')
      .replace('SOS', '<select class="form-control d-inline w-auto">' + optionM.map(e => '<option>' + e + '</option>').join('') + '</select>');
      console.log(this.sentenceM)
      let selectedOption = 
      this.container.nativeElement.innerHTML = this.sentenceM; */
    }

    ciaoPreM(){
      for (let i = 0; i < this.preSliceM.length; i++) {
        const elementM = this.preSliceM[i];
        window.open(
          'https://dict.leo.org/italienisch-deutsch/' + elementM,
          '_blank'
        );
      }
    }
    ciaoPostM(){
      for (let i = 0; i < this.postSliceM.length; i++) {
        const elementM = this.postSliceM[i];
        window.open(
          'https://dict.leo.org/italienisch-deutsch/' + elementM,
          '_blank'
        );
      }
    }

    checkOptionM(){
      if (this.valueM === this.wordM) {
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