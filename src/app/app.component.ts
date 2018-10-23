import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public expanded = false;
  public countries: Array<string> = ['Russia', 'USA'];
  public form: FormGroup;
  public resultForm: Array<any>;
  public dataOption: Array<string>;

  constructor() {
    this.createForm();
    this.form.valueChanges.forEach(result => {
      this.resultForm = [];
      this.dataOption = [];
      for (let key in result) {
        if (result.hasOwnProperty(key)) {
          this.resultForm.push({ name: key, check: result[key] });
          if (result[key]) {
            this.dataOption.push(key)
          }
        }
      }
    })
  }

  createForm() {
    let group: any = {};
    for (let country of this.countries) {
      group[country] = country ? new FormControl(false, Validators.required)
        : new FormControl(false);
    };
    this.form = new FormGroup(group);
  }

  select(country) {
    if (this.form.get(country).value === true) {
      this.form.get(country).setValue(false);
    } else {
      this.form.get(country).setValue(true);
    }
  }

  showCheckboxes() {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }
}
