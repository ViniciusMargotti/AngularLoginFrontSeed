import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private loginservice: AuthenticationService) { }
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }
  get nomeInput() { return this.signin.get('nome'); }
  get sobrenomeInput() { return this.signin.get('sobrenome'); }
  get numeroInput() { return this.signin.get('numero'); }
  get enderecoInput() { return this.signin.get('endereco'); }
  get complementoInput() { return this.signin.get('complemento'); }
  get referenciaInput() { return this.signin.get('referencia'); }

  email = '';
  password = '';
  nome = '';
  sobrenome = '';
  complemento = '';
  referencia = '';
  numero = '';
  endereco = '';
  invalidLogin = false;

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    nome: new FormControl('', [ Validators.required ]),
    sobrenome: new FormControl('', [Validators.required ]),
    numero: new FormControl('' , [Validators.required ]),
    endereco: new FormControl('' , [Validators.required ]),
    complemento: new FormControl(''),
    referencia: new FormControl('' ),

  });
  hide = true;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.email, this.password).subscribe(
        data => {
          this.loginservice.saveToken(data.token);
          this.router.navigate(['']);
          this.invalidLogin = false;
        },
        error => {
          this.invalidLogin = true;
        }
      )
    );

  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
