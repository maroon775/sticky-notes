
Create instance with selector:  
  
`const sticky = new StickyNotes('#container');`  
  
  
Create instance with HTMLElement node:  
  
`const Container = document.querySelector('#container');`  
  
`const sticky2 = new StickyNotes(Container);`  
  
  
### Arguments  
Container - element node or selector for add new stickers    
```javascript  
// container node usage const nontainerNode = document.querySelector('body .page #container')  
const instanceWithNode = new StickyNotes(nontainerNode);   
// container selector usage  
const instanceWithSelector = new StickyNotes('body .page #containerSelector'); 
```
  
### Instance methods  
  
`const instance = new StickyNotes(Container);`  
  
| Method name | return type | Description |  
| ------ | ------ | ------ |  
| `disableStickers()` | void | Disable all stickers for changes |  
| `enableStickers()` | void | Enable all stickers for changes |  
| `getStickersContent()`  | Array[String] | All stickers content as array strings |  
| `getStyleString()` | String | CSS styles as string |  
| `createSticker(StickerItemOptions)` | StickerItem | Create new sticker |  
  
#### `StickerItemOptions`
  
| Option | Type | Required | Default value |  
| ------ | ------ | ------ | ------ |  
| `contentComponent` | Component one of (`StickyNotes.Components.content`) | Yes | - |  
| `position` | { top: Number, left: Number } | No | `{ top: 0, left: 0 }` |  
  
#### Components  
  
`StickyNotes.Components.content.Textarea` - Textarea component 
**Options:**  
| Option | Type | Required | Default value |  
| ------ | ------ | ------ | ------ |  
| `resizable` | Boolean | No | false |  
| `maxWidth` | Number | No | - |  
| `maxHeight` | Number | No | - |  
| `minWidth` | Number | No | 150 |  
| `minHeight` | Number | No | 100 | 
  
`StickyNotes.Components.StickerItem` - Sticker component
  
  
  
### Examples  
  
##### Default 
```html  
<div>
	<button id="addNote">ADD NOTE</button>
</div>
```  
  
```javascript
document.querySelector('#addNote').addEventListener('click', function(){  
	stickyNotesInstance.createSticker({
		contentComponent: new StickyNotes.Components.content.Textarea()
	})
});
```  
  
##### Resizable  
```html  
<div>
	<h5>Add new note with position left - 100px, top - 200px & resizable</h5>
	<button id="addResizableNoteWithPosition">ADD NOTE WITH POSITION & RESIZABLE</button>
</div>
```  
```javascript  
document.querySelector('#addResizableNoteWithPosition').addEventListener('click', function(){  
	stickyNotesInstance.createSticker({
		contentComponent: new StickyNotes.Components.content.Textarea({  
			resizable: true
		}),
		position: {  
			left:100,  
			top: 200
		}
	})
});
```  
  
##### Advanced  
```html  
<div>
	 <h5>Advanced Example</h5>
	 <button id="addNoteAdvanced">ADD NOTE ADVANCED</button>
</div>
```  
```javascript  
document.querySelector('#addNoteAdvanced').addEventListener('click', function(){  
	stickyNotesInstance.createSticker({  
		contentComponent: new StickyNotes.Components.content.Textarea({  
			resizable: true, // optional  
			
			maxWidth: 400, // optional  
			maxHeight: 400, // optional  
			
			minWidth: 200, // optional & as initial width  
			minHeight: 200, // optional & as initial height  
		}),
		position: {  
			left: 300, // optional  
			top: 300 // optional  
		}
	})
});
```
