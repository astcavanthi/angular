import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Agent } from './agent.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Injectable()
export class AgentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/agent.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Agent[]> = new BehaviorSubject<Agent[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Agent;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Agent[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAgents(): void {
    this.subs.sink = this.httpClient.get<Agent[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      },
    });
  }

  addAgent(agent: Agent): void {
    this.dialogData = agent;

    this.httpClient.post(this.API_URL, agent)
      .subscribe({
        next: (data) => {
          this.dialogData = agent;
        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }
  updateAgent(agent: Agent): void {
    this.dialogData = agent;

    // this.httpClient.put(this.API_URL + agent.id, agent)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = agent;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAgent(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
