import { Component, OnInit } from '@angular/core';
import { IConverterOptionsChangeable } from 'ng2-md';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  tmpCategory : string;

  options: IConverterOptionsChangeable = {
    disableForced4SpacesIndentedSublists: false,
    encodeEmails: true,
    excludeTrailingPunctuationFromURLs: false,
    ghCodeBlocks: true,
    ghCompatibleHeaderId: false,
    ghMentions: false,
    ghMentionsLink: 'https://github.com/{u}',
    headerLevelStart: 1,
    literalMidWordUnderscores: false,
    noHeaderId: false,
    omitExtraWLInCodeBlocks: false,
    parseImgDimensions: false,
    prefixHeaderId: false,
    requireSpaceBeforeHeadingText: false,
    simpleLineBreaks: false,
    simplifiedAutoLink: false,
    smartIndentationFix: false,
    smoothLivePreview: false,
    strikethrough: false,
    tables: false,
    tablesHeaderId: false,
    tasklists: false,
    trimEachLine: 'space'
  };

  constructor() { }

  ngOnInit() {
  }

}
