Create instance with selector:

`const sticky = new StickyNotes('#container');`


Create instance with HTMLElement node:

`const Container = document.querySelector('#container');`

`const sticky2 = new StickyNotes(Container);`


#### Arguments
`const instance = new StickyNotes(Container, Options);`
##### Container
Container element or selector for add new stickers

##### Options (optional)
| Option | Type | Required | Default value |
| ------ | ------ | ------ | ------ |
| `contentOptions` | Object | No | {} |
| `contentOptions.resizable` | Boolean | No | false |
| `options` | Object | No | {} |
| `options.position` | Object | No | {} |
| `options.position.top` | Number | No | 0 |
| `options.position.left` | Number | No | 0 |


#### Public methods
`const instance = new StickyNotes(Container, Options);`
| Method name | return type | Description |
| ------ | ------ | ------ |
| `disableStickers` | void| Disable all stickers for changes |
| `enableStickers` | void | Enable all stickers for changes|
| `getStickers` | Array[String] | All stickers content as array strings |

 

