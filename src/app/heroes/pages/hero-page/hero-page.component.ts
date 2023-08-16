import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroesServices: HeroesService,
    private activatedRouted: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRouted.params
      .pipe(
        switchMap(({id}) => this.heroesServices.getHeroById(id)),
      )
      .subscribe(hero => {
        if(!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        return;
      })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list');
  }
}
