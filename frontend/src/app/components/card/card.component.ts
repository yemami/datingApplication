import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() index!: number;
  @Input() name!: string;
  @Input() age!: number;
  @Input() bio!: string;
  @Input() location!: string;
  @Input() picture!: string;
  @Output() like = new EventEmitter<void>();
  @Output() dislike = new EventEmitter<void>();

  onSwipe(event: any) {
    if (event.deltaX > 0) {
      this.like.emit();
    } else {
      this.dislike.emit();
    }
  }
  likeUser() {
    // this.like.emit(this.index);
  }

  dislikeUser() {
    // this.dislike.emit(this.index);
  }

  getCardTransform(index: number) {
    // Code to calculate the transform based on the index of the card
  }
}
