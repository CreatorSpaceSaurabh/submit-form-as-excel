import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'submit-form-to-excel';
  volunteerForm : FormGroup;
  urlToStoreData : string = 'https://script.google.com/macros/s/AKfycbzddjgzQrEe0-50-2cmaJCi8PLtt_A37yaYdU1eVQF6GJrsTLrTXYUzBctHKGug4vOdgg/exec';
  isLoading : boolean = false;
  isSubmited : boolean = false;

  constructor( private formBuilder : FormBuilder , private httpClient : HttpClient){

  }

  ngOnInit(){
    this.volunteerForm = this.formBuilder.group({
      name : ['',Validators.required],
      email : ['',Validators.required],
      phone : ['',Validators.required],
      street : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zip : ['',Validators.required]
    })
  }

  submitForm(){
    console.log("\n\n form values ==",this.volunteerForm.value);
    this.isLoading = true;
    jQuery.ajax({
      crossDomain: true,
      url: this.urlToStoreData,
      method: "post",
      data: this.volunteerForm.value,
      success:(result)=>{
        this.isLoading = false;
        this.isSubmited = true;
        console.log("\n\n Response after record stored ==",result);
			}
      });

      /* Angular HTTP client code for submitting request */
    // this.httpClient.post(this.urlToStoreData,this.volunteerForm.value,{
    //   headers : {
    //   }
    // }).subscribe(async (res:any)=>{
    //   console.log("\n\n Response after record stored ==",res);
      
    // })
  }
}
