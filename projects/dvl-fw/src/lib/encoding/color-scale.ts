import { Operator, map, lookup } from '@ngx-dino/core';
import { scaleLinear } from 'd3-scale';


export interface RGB {
  r: number;
  g: number;
  b: number;
}

export class ColorScale {
  private startRGB: RGB;
  private endRGB: RGB;

  constructor(
    start: string,
    end: string,
    private outOfDomainColor: string,
    private strokeOffset: number = 0
  ) {
    this.startRGB = this.getRGB(start);
    this.endRGB = this.getRGB(end);
  }

  qualitative<T>(items: T[], strokeOffset = 0): Operator<T, string> {
    const colors: Map<T, string> = new Map();
    const colorer = this.getQualitativeColorFunction([0, items.length - 1], strokeOffset);
    items.forEach((item, index) => {
      colors.set(item, colorer(index));
    });
    return lookup<T, string>(colors, this.outOfDomainColor);
  }
  qualitativeStrokeColor<T>(items: T[]): Operator<T, string> {
    return this.qualitative(items, this.strokeOffset);
  }

  getQualitativeColorFunction(domain: number[], offset = 0): (number) => string {
    const addends = this.getAddends(domain[1] - domain[0]);

    return (index) =>  this.getHex({
        r: Math.min(255, Math.max(0, this.startRGB.r + addends[0] * index + offset)),
        g: Math.min(255, Math.max(0, this.startRGB.g + addends[1] * index + offset)),
        b: Math.min(255, Math.max(0, this.startRGB.b + addends[2] * index + offset))
    });
  }

  quantitative(domain: number[], strokeOffset = 0): Operator<number, string> {
    return map<number, string>(this.getQuantitativeColorFunction(domain, strokeOffset));
  }
  quantitativeStrokeColor(domain: number[]): Operator<number, string> {
    return this.quantitative(domain, this.strokeOffset);
  }

  getQuantitativeColorFunction(domain: number[], offset = 0): (number) => string {
    return scaleLinear<string, string>()
      .domain(domain)
      .range([
        this.getHex({
          r: Math.min(255, Math.max(0, this.startRGB.r + offset)),
          g: Math.min(255, Math.max(0, this.startRGB.g + offset)),
          b: Math.min(255, Math.max(0, this.startRGB.b + offset))
         }),
        this.getHex({
          r: Math.min(255, Math.max(0, this.endRGB.r + offset)),
          g: Math.min(255, Math.max(0, this.endRGB.g + offset)),
          b: Math.min(255, Math.max(0, this.endRGB.b + offset))
        })
      ]);
  }

  getRGB(hex: string): RGB {
    hex = hex.substring(1);
    const color: RGB = { r: 0, g: 0, b: 0};
    color.r =  parseInt('0x' + hex.substring(0, 2), 16);
    color.g = parseInt('0x' + hex.substring(2, 4), 16);
    color.b = parseInt('0x' + hex.substring(4, 6), 16);
    return color;
  }

  getHex(color: RGB): string {
    return '#'
      + Math.round(color.r).toString(16)
      + Math.round(color.g).toString(16)
      + Math.round(color.b).toString(16);
  }

  getAddends(categoryCount): number[] {
    return Array.of(
      (this.endRGB.r - this.startRGB.r),
      (this.endRGB.g - this.startRGB.g),
      (this.endRGB.b - this.startRGB.b)
    ).map((a) => a / categoryCount);
  }
}

