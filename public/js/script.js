var stickyNotesInstance;
document.addEventListener('readystatechange', function(event) {
    if(document.readyState === 'complete') {
        stickyNotesInstance = new StickyNotes('#example');
        
        document.querySelector('#addNote').addEventListener('click', function(){
        	stickyNotesInstance.createSticker({
        		contentComponent: new StickyNotes.Components.content.Textarea()
        	})
        });
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
        		},
				startIndex: 1000 // optional starts value for zIndex
        	})
        });
    }
});
