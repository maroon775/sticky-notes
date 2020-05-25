var stickyNotesInstance;
document.addEventListener('readystatechange', function(event) {
    console.log(event);
    
    if(document.readyState === 'complete') {
        stickyNotesInstance = new StickyNotes('#example');
        
        document.querySelector('#add').addEventListener('click', function(){
            stickyNotesInstance.createSticker({
                contentComponent: new StickyNotes.Components.content.Textarea({
                    resizable: true
                }),
                
            })
        });
        document.querySelector('#addPosition').addEventListener('click', function(){
            stickyNotesInstance.createSticker({
                contentComponent: new StickyNotes.Components.content.Textarea({
                    resizable: false
                }),
                position: {
                    left:100,
                    top: 200
                }
            })
        });
        
        document.querySelector('#addAdvanced').addEventListener('click', function(){
            stickyNotesInstance.createSticker({
                contentComponent: new StickyNotes.Components.content.Textarea({
                    resizable: true, // optional
                    
                    maxWidth: 400, // optional
                    maxHeight: 400, // optional
                
                    minWidth: 200, // optional & as initial width
                    minHeight: 200, // optional & as initial height
                }),
                position: {
                    left:300, // optional
                    top: 300 // optional
                }
            })
        });
    }
});
