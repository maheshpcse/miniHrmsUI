import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[emoji]'
})
export class EmojiDirective {

    @Input('emoji') emoji: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.el.nativeElement.textContent += this.getEmoji(this.emoji);
    }

    getEmoji(uniEmoji: string) {
        let emoji: string;
        switch (uniEmoji) {
            case 'smile': emoji = '\uD83D\uDE42';
        }

        return emoji;
    }

}
