import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-alert-status-message',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './alert-status-message.component.html',
  styleUrl: './alert-status-message.component.css'
})
export class AlertStatusMessageComponent implements OnInit {
  @Input() success = false;
  @Input() message = "";
  @Input() mileSecondsBeforeRedirect = 4000;
  @Output() redirectTo = new EventEmitter();

  ngOnInit(): void {
    setInterval(() => {
      this.redirectTo.emit();
    }, this.mileSecondsBeforeRedirect);
  }

}
