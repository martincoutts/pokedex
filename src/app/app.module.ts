import { PokemonComponent } from './pokemon/pokemon.component';

import { PokemonService } from './services/pokemon.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { TypesComponent } from './types/types.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SearchComponent } from './search/search.component';
import { SortDropdownComponent } from './sort-dropdown/sort-dropdown.component';

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
        TypesComponent,
        MenuBarComponent,
        SearchComponent,
        SortDropdownComponent,
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
        FormsModule,
        BrowserAnimationsModule,

        MatProgressSpinnerModule,
        MatExpansionModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatSelectModule,
    ],
    providers: [PokemonService],
    bootstrap: [AppComponent],
})
export class AppModule {}
