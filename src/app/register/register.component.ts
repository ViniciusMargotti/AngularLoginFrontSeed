import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {BairroService} from '../service/bairro.service';
import {CidadeService} from '../service/cidade.service';
import {EstadoService} from '../service/estado.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private cidadeservice: CidadeService,
              private estadoservice: EstadoService,
              private bairroservice: BairroService) {
  }

  get emailInput() {
    return this.signin.get('email');
  }

  get passwordInput() {
    return this.signin.get('password');
  }

  get nomeInput() {
    return this.signin.get('nome');
  }

  get sobrenomeInput() {
    return this.signin.get('sobrenome');
  }

  get bairroInput() {
    return this.signin.get('bairro');
  }

  get numeroInput() {
    return this.signin.get('numero');
  }

  get enderecoInput() {
    return this.signin.get('endereco');
  }

  get cepInput() {
    return this.signin.get('cep');
  }

  get complementoInput() {
    return this.signin.get('complemento');
  }

  get referenciaInput() {
    return this.signin.get('referencia');
  }

  email = '';
  password = '';
  nome = '';
  sobrenome = '';
  bairro = 0;
  complemento = '';
  referencia = '';
  numero = '';
  endereco = '';
  cep = '';

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(3)]),
    nome: new FormControl('', [Validators.required]),
    sobrenome: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    complemento: new FormControl(''),
    referencia: new FormControl(''),

  });
  hide = true;

  bairros: Bairro[] = [];
  cidades: Cidade[] = [];
  estados: Estado[] = [];

  ngOnInit() {
    this.getEstados();
  }

  getBairros(cidadeSelecionada) {
    this.bairroservice.getAll(cidadeSelecionada).subscribe(
      data => {
        this.bairros = data;
      },
      error => {
        return [];
      }
    );
    return null;
  }
  getCidades(estadoSelecionado) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.cidadeservice.getAll(estadoSelecionado).subscribe(
      data => {
        this.cidades = data;
      },
      error => {
        return [];
      }
    );
    return null;
  }

  getEstados() {
    this.estadoservice.getAll().subscribe(
      data => {
        this.estados = data;
      },
      error => {
        return [];
      }
    );
    return null;
  }

  saveUsuario() {

    // tslint:disable-next-line:no-debugger
    debugger;

    const bairro: Bairro = {
      id : this.bairroInput.value,
      nome : '',
      cidade : null,
    };

    const pessoa: Pessoa = {
      cep : this.cep,
      complemento : this.complemento,
      endereco: this.endereco,
      nome: this.nome,
      numero: this.numero,
      referencia: this.referencia,
      sobrenome: this.sobrenome,
      id : null,
      bairro
    };

    const usuario: Usuario = {
      id : null,
      email : this.email,
      senha : this.password,
      pessoa
    };

    this.loginservice.saveUsuario(usuario).subscribe(
      data => {
        alert('cadsatradod com sucesso!');
      },
      error => {
        return [];
      }
    );
    return null;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
