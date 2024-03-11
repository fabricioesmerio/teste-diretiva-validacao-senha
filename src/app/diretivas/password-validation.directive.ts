import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[passwordValidation]',
  standalone: true
})
export class PasswordValidationDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('keyup')
  teste() {
    console.log('estamos aqui', this.elementRef.nativeElement.value)
    console.log('Parent :: ', this.elementRef.nativeElement.parentElement)

    const password = this.elementRef.nativeElement.value.trim()

    if (!password) {
      this.removeDiv();
      return;
    }

    const score = this.passwordValidator(password)
    this.renderLabelByScore(score);

  }

  private renderLabelByScore(score: number) {
    const elementParent = this.elementRef.nativeElement.parentElement;

    this.removeDiv();

    const div = this.renderer.createElement('div');
    this.renderer.setStyle(div, 'padding', '8px');
    this.renderer.setStyle(div, 'margin-top', '12px');
    this.renderer.setStyle(div, 'border-radius', '4px');

    this.renderer.addClass(div, '__validation-result');

    let text: string = '';

    if (score >= 70) {
      this.renderer.setStyle(div, 'background-color', 'green');
      text = this.createTextScore('Sua senha atende as especificações');
    } else if (score < 70 && score >= 50) {
      this.renderer.setStyle(div, 'background-color', 'yellow');
      text = this.createTextScore('A complexidade da sua senha é mediana');
    } else {
      this.renderer.setStyle(div, 'background-color', 'red');
      text = this.createTextScore('Sua senha é muito fraca');
    }

    this.renderer.appendChild(div, text)
    this.renderer.appendChild(elementParent, div)
  }

  private createTextScore(text: string) {
    return this.renderer.createText(text);
  }

  private removeDiv() {
    const existElement = this.elementRef.nativeElement.parentElement.querySelector('.__validation-result')

    if (existElement)
      this.renderer.removeChild(this.elementRef.nativeElement.parentElement, existElement)
  }

  private passwordValidator(password: string): number {
    let score = 0;

    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length >= 8) {
      score += 20;
    }

    // Verifica se a senha tem letras maiúsculas, minúsculas, números e caracteres especiais
    if (/[A-Z]/.test(password)) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 20;

    // Penaliza senhas com sequências repetitivas de caracteres
    if (this.hasRepeatingSequence(password)) {
      score -= 30;
    }

    return Math.max(0, Math.min(100, score));
  }

  private hasRepeatingSequence(senha: string): boolean {
    for (let i = 0; i < senha.length - 2; i++) {
      if (senha[i] === senha[i + 1] && senha[i] === senha[i + 2]) {
        return true;
      }
    }
    return false;
  }

}
