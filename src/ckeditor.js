/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}

// Custom plugin to insert image urls
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

class ImageInsert extends Plugin {
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add('imageInsert', locale => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Insert image by URL',
        icon: imageIcon,
        tooltip: true
      });
      view.on('execute', () => {
        const imageUrl = prompt('Image URL');
        editor.model.change(writer => {
          const imageElement = writer.createElement('image', {
            src: imageUrl
          });
          editor.model.insertContent(imageElement, editor.model.document.selection);
        });
      });
      return view;
    });
  }
}

// Plugins to include in the build.
const plugins = [
  Essentials,
  UploadAdapter,
  Autoformat,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  CKFinder,
  //EasyImage,
  Base64UploadAdapter,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageInsert,
  Indent,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation
];

ClassicEditor.builtinPlugins = plugins;
InlineEditor.builtinPlugins = plugins;

// Editor configuration.
const config = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'imageUpload',
      'imageInsert',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};

ClassicEditor.defaultConfig = config;
InlineEditor.defaultConfig = config;

export default {
  ClassicEditor, InlineEditor
};
