import { PokemonService } from "./services/pokemon.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ScreenComponent } from "./screen/screen.component";
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [AppComponent, ScreenComponent, PokemonListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
