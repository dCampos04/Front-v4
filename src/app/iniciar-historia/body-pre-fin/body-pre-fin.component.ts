import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-pre-fin',
  templateUrl: './body-pre-fin.component.html',
  styleUrls: ['./body-pre-fin.component.css']
})
export class BodyPreFinComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Espera 10 segundos y luego navega a la ruta /terminar
    setTimeout(() => {
      this.router.navigate(['/terminar']);
    }, 8000);
  }
}
