import { PokemonService } from "./services/pokemon.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ScreenComponent } from "./screen/screen.component";

@NgModule({
  declarations: [AppComponent, ScreenComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
