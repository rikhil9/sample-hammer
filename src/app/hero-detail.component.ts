import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id).subscribe((hero) => {
          (this.hero = hero);
          this.hero.created_at= this.hero.created_at.split('T')[0];
        });
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  goBack(): void {
    if (this.navigated) {
      window.history.back();
    }
  }
}
