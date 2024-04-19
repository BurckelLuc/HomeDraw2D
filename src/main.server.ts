import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import {AppModule} from "./app/app.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app/app.component";

const bootstrap = () => bootstrapApplication(AppComponent, config)
export default  bootstrap;
