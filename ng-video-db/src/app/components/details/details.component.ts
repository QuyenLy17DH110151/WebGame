import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  gameRating: number = 0;
  gameId: string = '';
  game: Game = {
    background_image: '',
    id: '',
    name: '',
    released: '',
    metacritic_url: '',
    website: '',
    description: '',
    metacritic: 0,
    genres: [],
    parent_platforms: [],
    publishers: [],
    ratings: [],
    screenshots: [],
    trailers: [],
  };

  constructor(
    private activedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(
        tap((params: Params) => {
          this.gameId = params['id'];
          this.getGameDetails(this.gameId);
        })
      )
      .subscribe();
  }

  getGameDetails(gameId: string) {
    this.subs.add(
      this.httpService
        .getGameDetails(gameId)
        .pipe(
          tap((game: Game) => {
            this.game = game;
            setTimeout(() => {
              this.gameRating = this.game.metacritic;
            }, 0);
          })
        )
        .subscribe()
    );
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 70) {
      return 'fffa50';
    } else {
      return '#f7aa38';
    }
  }
}
