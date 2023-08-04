import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup-surveys',
  templateUrl: './setup-surveys.component.html',
  styleUrls: ['./setup-surveys.component.css']
})
export class SetupSurveysComponent implements OnInit {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(["dashboard/engage"]);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  goNext(){
    this.router.navigate(["survey/load-wallet"]);
  }

}
