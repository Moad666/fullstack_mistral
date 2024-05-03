import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppServiceService } from './app-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  generatedTexts: string[] = [];
  prompt: string = '';
  loading: boolean = false;
  constructor(private apiService : AppServiceService){}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService.generateText(this.prompt).subscribe(
      (response) => {
        this.loading = false;
        this.generatedTexts = [response.response]; // Wrap the response in an array
        console.log("wait...");
        console.log(this.generatedTexts);
      },
      (error) => {
        this.loading = false;
        console.error('Error:', error);
      }
    );
  }

}
