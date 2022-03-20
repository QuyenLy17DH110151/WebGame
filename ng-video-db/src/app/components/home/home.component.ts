import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs';
import { APIResponse } from 'src/app/models/apiResponse.model';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public sort: string = '';
  public games: Array<Game> = new Array<Game>();
  constructor(
    private activedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params
      .pipe(
        tap((params: Params) => {
          if (params['game-search']) {
            this.searchGames('metacrit', params['game-search']);
          } else {
            this.searchGames('metacrit');
          }
        })
      )
      .subscribe();
  }

  searchGames(sort: string, search?: string): void {
    this.httpService
      .getGameList(sort, search)
      .pipe(
        tap((games: APIResponse<Game>) => {
          this.games = games.results;
        })
      )
      .subscribe();
  }
}
