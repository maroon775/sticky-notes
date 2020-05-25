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
                    resizable: true
                }),
                position: {
                    left:100,
                    top: 200
                }
            })
        });
    }
});
