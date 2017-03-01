import { Component, OnInit } from '@angular/core';
import { TalksService } from '../../shared/talks.service';
import {ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-talks-chat',
  templateUrl: './talks-chat.component.html',
  styleUrls: ['./talks-chat.component.scss']
})
export class TalksChatComponent implements OnInit {
  private talk: any = "";
  private message: string = "";
  private id: number;

  constructor(private TalksService: TalksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Chama o método para baixar as mensagens assim que carrega a página
      this.TalksService.getMessages(params['id'])
        .subscribe(data => {
                              this.talk = data;
                              this.id = params['id'];
                           },
                   err  => {this.router.navigateByUrl('/')}
      );

      // Se inscreve para receber a mensagem de 4 em 4 segundos
      this.TalksService.poolingMessages(params['id'])
        .subscribe(data => {this.talk = data},
                   err => {this.router.navigateByUrl('/')}
      );
    });
  }

  sendMessage()
  {
    this.TalksService.createMessage(this.id, this.message, true)
      .subscribe(data => {
        // Recarrega as mensagens depois de enviar uma nova
        this.TalksService.getMessages(this.id)
          .subscribe(data => {this.talk = data},
                     err  => {this.router.navigateByUrl('/')}
        );
        // Apaga a mensagem do campo
        this.message = "";
      }
    );
  }

  private onEvent(event: KeyboardEvent): void {
    if(event.key == "Enter" && this.message != "")
      this.sendMessage();
  }
}
