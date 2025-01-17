import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  private readonly _defaultPrimaryColor: string = "#84A7CD";
  private readonly _defaultSecondaryColor: string = "#214178";

  public config = {
    settings: {
      layout: "Dubai",
      layout_type: "ltr",
      layout_version: "light-only",
      icon: "stroke-svg",
    },
    color: {
      primary_color: this._defaultPrimaryColor,
      secondary_color: this._defaultSecondaryColor,
    },
  };

  constructor() {
    this._initializeLayoutType();
    this._initializeColors();
  }

  private _initializeLayoutType(): void {
    if (this.config.settings.layout_type === "rtl") {
      document
        .getElementsByTagName("html")[0]
        .setAttribute("dir", this.config.settings.layout_type);
    }
  }

  private _initializeColors(): void {
    const primaryColor = this._getStoredColor(
      "primary_color",
      this._defaultPrimaryColor
    );
    const secondaryColor = this._getStoredColor(
      "secondary_color",
      this._defaultSecondaryColor
    );

    this.config.color.primary_color = primaryColor;
    this.config.color.secondary_color = secondaryColor;

    this._applyColors(primaryColor, secondaryColor);
  }

  private _getStoredColor(key: string, defaultColor: string): string {
    return localStorage.getItem(key) || defaultColor;
  }

  private _applyColors(primaryColor: string, secondaryColor: string): void {
    document.documentElement.style.setProperty("--theme-deafult", primaryColor);
    document.documentElement.style.setProperty(
      "--theme-secondary",
      secondaryColor
    );
  }

  public setColor(primary_color: string, secondary_color: string): void {
    this.config.color.primary_color = primary_color;
    this.config.color.secondary_color = secondary_color;
    localStorage.setItem("primary_color", primary_color);
    localStorage.setItem("secondary_color", secondary_color);
    window.location.reload();
  }

  public resetColor(): void {
    this._applyColors(this._defaultPrimaryColor, this._defaultSecondaryColor);
    this._updateColorPickers(
      this._defaultPrimaryColor,
      this._defaultSecondaryColor
    );
    this._storeDefaultColors();
    window.location.reload();
  }

  private _updateColorPickers(
    primaryColor: string,
    secondaryColor: string
  ): void {
    (<HTMLInputElement>document.getElementById("ColorPicker1")).value =
      primaryColor;
    (<HTMLInputElement>document.getElementById("ColorPicker2")).value =
      secondaryColor;
  }

  private _storeDefaultColors(): void {
    localStorage.setItem("primary_color", this._defaultPrimaryColor);
    localStorage.setItem("secondary_color", this._defaultSecondaryColor);
  }
}
