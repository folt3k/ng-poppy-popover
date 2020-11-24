import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'demo-widget',
  templateUrl: './demo-widget.component.html',
  styleUrls: ['./demo-widget.component.scss'],
})
export class DemoWidgetComponent implements OnInit, AfterViewInit {
  @ViewChild('content') contentEl: ElementRef<HTMLElement>;

  @Input() title: string;
  @Input() codeSnippets: string[] = [];

  showSeparator: boolean = false;
  showCode: boolean = false;
  selectedSnippet: string;

  constructor() {}

  ngOnInit(): void {
    this.selectedSnippet = this.codeSnippets[0];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.contentEl.nativeElement.querySelector('[content]')) {
        this.showSeparator = true;
      }
    });
  }

  toggleCode(): void {
    this.showCode = !this.showCode;
  }

  selectTab(snippet: string): void {
    this.selectedSnippet = snippet;
  }

  getSnippetLabel(snippet: string): string {
    const splitedSnippet = snippet.split('/');
    return splitedSnippet[splitedSnippet.length - 1];
  }
}
