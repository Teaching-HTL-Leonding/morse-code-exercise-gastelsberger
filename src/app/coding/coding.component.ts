import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coding',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.css']
})
export class CodingComponent {
  form = new FormGroup({
    str: new FormControl('', [
      Validators.pattern('^(?:[A-Z ]+|[ .\\-/]+)$') // Updated RegEx to include spaces, dots, dashes, and slashes
    ])
  });

  private morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
    'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
    'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
    'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..'
  };

  private textToMorseMap: { [key: string]: string } = Object.fromEntries(
    Object.entries(this.morseCodeMap).map(([k, v]) => [v, k])
  );

  getValue() {
    const control = this.form.get('str');

    if (control === null || control.value === null || !control.valid) {
      console.log('Invalid input');
      return;
    }

    const input = control.value.trim().replace(/\s+/g, ' ');

    if (/^[A-Z ]+$/.test(input)) {
      const morseCode = this.convertToMorse(input);
      console.log(morseCode);
    } else if (/^[.\- \/]+$/.test(input)) {
      const text = this.convertToText(input);
      console.log(text);
    } else {
      console.log('Invalid input');
    }
  }

  private convertToMorse(input: string): string {
    return input.split(' ')
      .map(word => word.split('')
        .map(letter => this.morseCodeMap[letter])
        .join(' '))
      .join(' / ');
  }

  private convertToText(input: string): string {
    return input.trim().split(' / ')
      .map(word => word.trim().split(/\s+/)
        .map(morse => this.textToMorseMap[morse] || '')
        .join(''))
      .join(' ');
  }
}
