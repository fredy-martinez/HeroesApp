import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  
  public heroForm = new FormGroup({

    id: new FormControl(''),             
    superhero: new FormControl<string>('', {nonNullable: true}),      
    publisher: new FormControl<Publisher>(Publisher.DCComics),      
    alter_ego: new FormControl(''),      
    first_appearance: new FormControl(''),
    characters: new FormControl(''),     
    alt_img: new FormControl(''),       
  });

  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {

    //Esta validacion dice que si url no tiene edit, va a crear un nuevo superheroe
    if (!this.router.url.includes('edit')) return;

    //Cargar info
    this.activatedRoute.params  
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroeById(id)),
      ).subscribe( hero =>{

        //validacion por si el heroe no existe
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return
      })
  }
  
  public publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ];

  get currentHerro(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  onSubmit(): void{

    if (this.heroForm.invalid) return;


    //Actualizar heroe
    if (this.currentHerro.id){
      this.heroesService.updateHero( this.currentHerro)
        .subscribe(hero =>{
          //TODO: mostrar snackbar
          this.showSnackBar(`${hero.superhero} updated!`)

        });
        return;
    }

    //Crear un heroe
    this.heroesService.addHero( this.currentHerro) 
      .subscribe (hero => {
        //TODO: mostrar snackbar y navegar a /heroes/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} Created!`)
      });
  }

  onDeleteHero(){
    if (!this.currentHerro.id) throw Error ('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      
    });
  }

  //Mensaje de hecho
  showSnackBar( message: string): void{
    this.snackBar.open( message, 'Done', {
      duration: 2500,
    })
  }
}
