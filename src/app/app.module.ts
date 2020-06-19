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
import { PokemonImageComponent } from './pokemon-image/pokemon-image.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';

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
        PokemonImageComponent,
        SpinnerComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', component: PokemonListComponent },
            { path: '?page=1&limit=151', component: PokemonListComponent },
            { path: 'pokemon/:id', component: PokemonComponent },
        ]),
        MatButtonModule,

        BrowserAnimationsModule,

        MatDialogModule,
        MatProgressSpinnerModule,
    ],
    providers: [PokemonService],
    bootstrap: [AppComponent],
})
export class AppModule {}
