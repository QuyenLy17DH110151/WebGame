import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private subs = new Subscription();
  constructor(private activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(
        tap((params: Params) => {
          console.log(params['id']);
        })
      )
      .subscribe();
  }
}
