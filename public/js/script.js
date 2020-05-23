document.addEventListener('readystatechange', function(event) {
    console.log(event);
    
    if(document.readyState === 'complete') {
        const test = new StickyNotes('#example');
    }
});
