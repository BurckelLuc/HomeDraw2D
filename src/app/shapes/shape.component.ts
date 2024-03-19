import {Component, Injectable, Input, OnInit, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Shape} from "../../utils/shapes/componentShapes/shape";

@Injectable()
export abstract class ShapeComponent {
  private static _id_generator = 0
  private _id : number;

  @Input("shape")
  _shape! : Shape;

  get id() {
    return this._id;
  }

  constructor(private viewContainerRef: ViewContainerRef) {
    this._id = ++ShapeComponent._id_generator;
  }


  abstract onHover(event: MouseEvent): void
  abstract onClick(event: MouseEvent): void
}
