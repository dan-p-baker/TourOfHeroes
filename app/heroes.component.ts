import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:['app/heroes.component.css'],
  directives: [HeroDetailComponent] 
})
export class HeroesComponent implements OnInit{
  ngOnInit(){
    this.getHeroes();
  } 
  
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes: Hero[];
  error: any;
  addingHero = false;
  
  constructor(
    private heroService: HeroService,
    private router: Router
    ) {}
  
  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  onSelect(hero: Hero) { 
    this.selectedHero = hero; }
    
  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }  
  
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }
  
  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }
  
  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero){
            this.selectedHero = null;
          }          
        })
        .catch(error => this.error = error);
  }
}


