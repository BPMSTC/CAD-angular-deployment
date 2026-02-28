import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe: hl
 * Lightweight syntax highlighter for TypeScript and HTML code blocks.
 * Usage: {{ codeString | hl : 'ts' }}  or  [innerHTML]="code | hl : 'html'"
 */
@Pipe({ name: 'hl', standalone: true, pure: true })
export class HighlightPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(code: string, lang: string = 'ts'): SafeHtml {
    if (!code) return this.sanitizer.bypassSecurityTrustHtml('');
    // Escape HTML entities first, then apply token colours
    const escaped = this.escape(code);
    const highlighted = lang === 'html' ? this.applyHtml(escaped)
                      : lang === 'css'  ? this.applyCss(escaped)
                      :                   this.applyTs(escaped);
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  // ── HTML escaping ────────────────────────────────────────────────────────
  private escape(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── TypeScript highlighter ───────────────────────────────────────────────
  private applyTs(code: string): string {
    // Use placeholders so earlier passes don't re-colour later ones
    const ph: string[] = [];
    const hold = (html: string) => { ph.push(html); return `\x00${ph.length - 1}\x00`; };

    let c = code;

    // 1. Single-line comments
    c = c.replace(/(\/\/[^\n]*)/g, m => hold(`<em class="cm">${m}</em>`));

    // 2. Strings (single / double / template literal)
    c = c.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g,
      m => hold(`<em class="s">${m}</em>`));

    // 3. Decorators
    c = c.replace(/(@[A-Za-z]\w*)/g, m => hold(`<b class="dc">${m}</b>`));

    // 4. Keywords
    const KW = /\b(import|export|from|default|class|const|let|var|new|return|if|else|for|of|in|while|do|switch|case|break|continue|function|async|await|extends|implements|interface|type|enum|abstract|public|private|protected|readonly|static|override|true|false|null|undefined|void|inject|signal|computed|effect)\b/g;
    c = c.replace(KW, m => hold(`<b class="kw">${m}</b>`));

    // Restore placeholders
    return c.replace(/\x00(\d+)\x00/g, (_, i) => ph[+i]);
  }

  // ── HTML template highlighter ────────────────────────────────────────────
  private applyHtml(code: string): string {
    const ph: string[] = [];
    const hold = (html: string) => { ph.push(html); return `\x00${ph.length - 1}\x00`; };

    let c = code;

    // HTML comments
    c = c.replace(/(&lt;!--[\s\S]*?--&gt;)/g, m => hold(`<em class="cm">${m}</em>`));

    // Attribute values (quoted)
    c = c.replace(/"([^"]*)"/g, m => hold(`<em class="s">${m}</em>`));

    // Angular binding attributes: [prop], (event), [(two-way)]
    c = c.replace(/(\[{1,2}[\w.()]+\]{1,2}|\({1,2}[\w.()]+\){1,2})/g,
      m => hold(`<b class="dc">${m}</b>`));

    // Tag names
    c = c.replace(/(&lt;\/?)([\w-]+)/g,
      (_, bracket, name) => `${bracket}${hold(`<b class="fn">${name}</b>`)}`);

    return c.replace(/\x00(\d+)\x00/g, (_, i) => ph[+i]);
  }

  // ── CSS highlighter ──────────────────────────────────────────────────────
  private applyCss(code: string): string {
    return code
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<em class="cm">$1</em>')
      .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<em class="s">$1</em>')
      .replace(/([\w-]+)\s*(?=\s*:(?!:))/g, '<b class="kw">$1</b>');
  }
}
