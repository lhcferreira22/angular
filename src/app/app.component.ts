import { Component, OnInit } from '@angular/core';
import { CursosService } from './services/cursos.service';
import { Cursos } from './models/cursos';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  curso = {} as Cursos;
  cursos!: Cursos[];

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.getCursos();
  }

  // defini se um curso será criado ou atualizado
  saveCursos(form: NgForm) {
    if (this.curso.id !== undefined) {
      this.cursosService.updateCursos(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.cursosService.saveCursos(this.curso).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para mostrar todos os cursos
  getCursos() {
    this.cursosService.getCursos().subscribe((cursos: Cursos[]) => {
      this.cursos = cursos;
    });
  }

  // deleta um curso
  deleteCursos(cursos: Cursos) {
    this.cursosService.deleteCursos(cursos).subscribe(() => {
      this.getCursos();
    });
  }

  // copia o curso para ser editado.
  editCursos(cursos: Cursos) {
    this.curso = { ...cursos };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getCursos();
    form.resetForm();
    this.curso = {} as Cursos;
  }

}
