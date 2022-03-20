import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { APIResponse } from 'src/app/models/apiResponse.model';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games: Array<Game> = new Array<Game>();
  private subs = new Subscription();

  constructor(
    private activedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(
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
        .subscribe()
    );
  }

  searchGames(sort: string, search?: string): void {
    this.subs.add(
      this.httpService
        .getGameList(sort, search)
        .pipe(
          tap((games: APIResponse<Game>) => {
            this.games = games.results;
          })
        )
        .subscribe()
    );
  }

  openGameDetails(id: string) {
    this.router.navigate(['details', id]);
  }
}
