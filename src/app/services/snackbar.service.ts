import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  sbShowing = false;
  sbTimer;
  style = null;
  constructor() { }

  showSnackbar(message: string, timeout: number, color: any) {

    if (typeof color === 'string') {
      if (color === 'success') {
        this.style = {
          color: 'white',
          backgroundColor: 'rgb(74, 189, 51)' // green
        };
      } else if (color === 'danger') {
        this.style = {
          color: 'white',
          backgroundColor: 'rgb(255, 84, 84)' // red
        };
      } else if (color === 'primary') {
        this.style = {
          color: 'white',
          backgroundColor: '#337ab7' // blue
        };
      }
    } else if (typeof color === 'object') {
      this.style = {
        color: color.color,
        backgroundColor: color.backgroundColor
      };
    } else {
      this.style = null;
    }

    if (!timeout) {
      timeout = 1000;
    }
    const sb = document.getElementById('snackbar');
    if (this.style) {
      sb.style.backgroundColor = this.style.backgroundColor;
      sb.style.color = this.style.color;
    }
    if (!this.sbShowing) {
      this.sbShowing = true;
      sb.innerHTML = message;
      sb.className = 'show';
      this.sbTimer = setTimeout(() => {
        this.sbShowing = false;
        sb.className = sb.className.replace('show', '');
      }, timeout);
    } else {
      sb.innerHTML = '';
      sb.className = sb.className.replace('show', '');
      clearTimeout(this.sbTimer);
      this.sbShowing = true;
      sb.innerHTML = message;
      sb.className = 'show';
      this.sbTimer = setTimeout(() => {
        this.sbShowing = false;
        sb.className = sb.className.replace('show', '');
      }, timeout);
    }
  }
}
