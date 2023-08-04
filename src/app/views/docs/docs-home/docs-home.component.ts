import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService, AlertService } from '../../../core/_services';

@Component({
  selector: 'app-docs-home',
  templateUrl: './docs-home.component.html',
  styleUrls: ['./docs-home.component.css']
})
export class DocsHomeComponent implements OnInit {

	loading = false;
	submitted = false;
	returnUrl = '';
	token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // this.getApiKey();
  }

  visitDocs(){
    window.open('https://chekkitapp.gitbook.io/chekkit-docs/api-reference', "_blank");

  }
  getApiKey() {
    this.submitted = true;
    console.log(8888)

    this.loading = true;
    this.authenticationService.getApiKey()
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
              console.log(data)
                // this.bc.postMessage("Logged In")
                this.token = data.data;
                // this.router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
            });
  }
}
