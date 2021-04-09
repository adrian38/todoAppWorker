import { Component, ViewChild } from '@angular/core';
import { IonTabButton, IonTabs } from '@ionic/angular';
import { element } from 'protractor';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs') tabs: IonTabs;

  tab1Active = '';
  tab2Active = '';
  tab3Active = '';

  constructor() {}

  setCurrentTab( event ) {
    const selectedTab = this.tabs.getSelected();
    if (selectedTab === 'tab1'){
      this.tab1Active = '_active';
      this.tab2Active = '';
      this.tab3Active = '';
    }
    else if (selectedTab === 'tab2'){
      this.tab1Active = '';
      this.tab2Active = '_active';
      this.tab3Active = '';
    }
    else if(selectedTab === 'tab3'){
      this.tab1Active = '';
      this.tab2Active = '';
      this.tab3Active = '_active';
    }
  }

}
