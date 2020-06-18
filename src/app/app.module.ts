import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PokemonComponent } from './pokemon/pokemon.component';

import { PokemonService } from './services/pokemon.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CommonModule } from '@angular/common';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';
import { WeaknessesComponent } from './weaknesses/weaknesses.component';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
import { NumberPadPipe } from './pipes/number-pad.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ScreenComponent,
        PokemonListComponent,
        PokemonComponent,
        EvolutionChainComponent,
        WeaknessesComponent,
        CapitalizeFirstLetterPipe,
        NumberPadPipe,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', component: PokemonListComponent },
            { path: 'pokemon/:id', component: PokemonComponent },
        ]),
        NzButtonModule,
        NzModalModule,
        BrowserAnimationsModule,
        NzSpinModule,
    ],
    providers: [PokemonService],
    bootstrap: [AppComponent],
})
export class AppModule {}
