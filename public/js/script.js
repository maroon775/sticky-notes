var test;
document.addEventListener('readystatechange', function(event) {
    console.log(event);
    
    if(document.readyState === 'complete') {
        test = new StickyNotes('#example', {
            contentOptions: {
                resizable: true
            }
        });
    }
});
