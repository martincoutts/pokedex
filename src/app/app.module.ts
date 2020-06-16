import { UtilitiesService } from './utilities.service';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CommonModule } from '@angular/common';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';

@NgModule({
    declarations: [
        AppComponent,
        ScreenComponent,
        PokemonListComponent,
        PokemonComponent,
        EvolutionChainComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', component: PokemonListComponent },
            { path: 'pokemon/:id', component: PokemonComponent },
        ]),
    ],
    providers: [PokemonService, UtilitiesService],
    bootstrap: [AppComponent],
})
export class AppModule {}
