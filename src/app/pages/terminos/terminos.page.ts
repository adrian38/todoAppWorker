import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  terminos = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus esse neque odit nam numquam quasi explicabo nemo, sapiente sit molestiae aliquid dolorem cum nesciunt iure, alias beatae! Fuga, excepturi impedit!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate voluptatum porro voluptatem praesentium accusantium, velit assumenda fugit enim eos explicabo dolorum necessitatibus inventore, dolores possimus distinctio, obcaecati perspiciatis dicta totam?. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut tempora ipsa at, cumque, necessitatibus, laboriosam libero aliquam reiciendis repellat harum magnam. Quibusdam nam sunt non molestias minima architecto vitae ea! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti dicta aliquam sequi cum quidem, quaerat alias obcaecati optio nemo ex molestias dolores commodi ipsum impedit placeat esse voluptatum architecto deleniti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis laboriosam reprehenderit dolore! Porro ad facilis perferendis corrupti laboriosam aperiam veritatis laborum ducimus ratione rerum. Tempore obcaecati velit quia cumque autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis earum iure, nam est qui commodi assumenda repellendus maiores sunt omnis sit aperiam impedit dolore repellat excepturi consequatur adipisci molestiae maxime?. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia alias molestias repellat, hic, placeat voluptatibus, aliquid adipisci cumque aut quos non dolores accusamus minima iusto qui quaerat? Inventore, in temporibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae necessitatibus natus temporibus quis ratione vel dolores unde magni nemo delectus, odio quidem. Vero illum, adipisci accusantium itaque voluptatibus blanditiis necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti suscipit et vero sapiente quam sunt, nam ratione voluptas modi doloribus tempora ut nostrum molestiae deserunt dolore consequatur sed. Ad, ipsum!';
  btnDisabled = true;

  constructor() { }

  ngOnInit() {
    const elemento = document.getElementById('terminos');
    elemento.innerHTML = this.terminos;
  }

  onChecked( event ) {
    console.log('Checked');
    this.btnDisabled = false;
  }

  onAccept() {
    console.log('Ya se puede continuar');
  }

}
